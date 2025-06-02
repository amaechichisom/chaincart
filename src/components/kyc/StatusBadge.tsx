import { Clock, CheckCircle, XCircle, Send, AlertTriangle, Pause } from 'lucide-react';

type StatusType =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'submitted'
  | 'under-review'
  | 'incomplete'
  | 'expired';

type SizeType = 'sm' | 'md' | 'lg';

interface StatusBadgeProps {
  status: StatusType;
  size?: SizeType;
  showIcon?: boolean;
  customLabel?: string;
  animated?: boolean;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'md',
  showIcon = true,
  customLabel,
  animated = false,
}) => {
  const statusConfig: Record<
    StatusType,
    {
      bg: string;
      text: string;
      border: string;
      label: string;
      icon: React.ElementType;
    }
  > = {
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      label: 'Pending Review',
      icon: Clock,
    },
    approved: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      label: 'Approved',
      icon: CheckCircle,
    },
    rejected: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      label: 'Rejected',
      icon: XCircle,
    },
    submitted: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      border: 'border-blue-200',
      label: 'Submitted',
      icon: Send,
    },
    'under-review': {
      bg: 'bg-purple-100',
      text: 'text-purple-800',
      border: 'border-purple-200',
      label: 'Under Review',
      icon: AlertTriangle,
    },
    incomplete: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200',
      label: 'Incomplete',
      icon: Pause,
    },
    expired: {
      bg: 'bg-orange-100',
      text: 'text-orange-800',
      border: 'border-orange-200',
      label: 'Expired',
      icon: AlertTriangle,
    },
  };

  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  const sizeConfig: Record<
    SizeType,
    { padding: string; text: string; iconSize: number }
  > = {
    sm: {
      padding: 'px-2 py-1',
      text: 'text-xs',
      iconSize: 12,
    },
    md: {
      padding: 'px-3 py-1',
      text: 'text-sm',
      iconSize: 14,
    },
    lg: {
      padding: 'px-4 py-2',
      text: 'text-base',
      iconSize: 16,
    },
  };

  const currentSize = sizeConfig[size] || sizeConfig.md;
  const displayLabel = customLabel || config.label;

  return (
    <span
      className={`
      inline-flex items-center gap-1.5 rounded-full font-medium border
      ${config.bg} ${config.text} ${config.border} ${currentSize.padding} ${currentSize.text}
      ${animated ? 'transition-all duration-200 ease-in-out' : ''}
    `}
    >
      {showIcon && (
        <Icon
          size={currentSize.iconSize}
          className={animated && status === 'pending' ? 'animate-spin' : ''}
        />
      )}
      {displayLabel}
    </span>
  );
};

// Enhanced Status Badge with additional features
interface EnhancedStatusBadgeProps extends StatusBadgeProps {
  timestamp?: string | number | Date;
  showTimestamp?: boolean;
  tooltipText?: string;
  onClick?: (status: StatusType) => void;
}

export const EnhancedStatusBadge: React.FC<EnhancedStatusBadgeProps> = ({
  status,
  timestamp,
  showTimestamp = false,
  tooltipText,
  onClick,
  ...props
}) => {
  const formatTimestamp = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const BadgeComponent = (
    <div className={`inline-flex flex-col items-center ${onClick ? 'cursor-pointer' : ''}`}>
      <StatusBadge status={status} {...props} />
      {showTimestamp && timestamp && (
        <span className="text-xs text-gray-500 mt-1">
          {formatTimestamp(timestamp)}
        </span>
      )}
    </div>
  );

  if (onClick) {
    return (
      <button
        onClick={() => onClick(status)}
        className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
        type="button"
      >
        {BadgeComponent}
      </button>
    );
  }

  if (tooltipText) {
    return (
      <div className="relative group">
        {BadgeComponent}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
          {tooltipText}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    );
  }

  return BadgeComponent;
};

// Status Badge with Progress Indicator
interface ProgressStatusBadgeProps extends StatusBadgeProps {
  progress?: number;
  showProgress?: boolean;
}

export const ProgressStatusBadge: React.FC<ProgressStatusBadgeProps> = ({
  status,
  progress = 0,
  showProgress = false,
  ...props
}) => {
  return (
    <div className="inline-flex flex-col items-center gap-2">
      <StatusBadge status={status} {...props} />
      {showProgress && (
        <div className="w-16 bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default StatusBadge;