import { useNavigate } from "react-router-dom";
import AppButton from "@/components/shared/AppButton";

type IListing = {
  title: string;
  btnText: string;
  href?: string;
  icons: React.ReactNode;
};

export const ListHead = ({ btnText, title, href, icons }: IListing) => {
  const navigate = useNavigate();
  return (
    <section className="flex flex-col md:flex-row justify-between items-center space-y-6">
      <p className="text-lg font-semibold">{title}</p>
      <AppButton
        label={btnText}
        onClick={() => navigate(href!)}
        leftIcon={icons}
      />
    </section>
  );
};
