import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import * as Image from './../../assets';
import { 
  Users, 
  Code, 
  Briefcase
} from "lucide-react";

const Team = () => {
  return (
    <div className='text-black text-center py-16 px-4 lg:px-8'>
        <div className='relative flex items-center justify-center gap-2 mb-2'>
            <Users color="#4a5568" size={28} />
            <h2 className='text-2xl font-medium'>MEET THE TEAM</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our talented team of professionals dedicated to delivering exceptional results
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
            <Card className='bg-transparent hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group'>
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <CardHeader>
                    <div className="relative">
                      <div className="absolute -top-1 -right-1 bg-blue-100 p-2 rounded-full">
                        <Briefcase size={18} className="text-blue-600" />
                      </div>
                      <CardTitle>
                        <img 
                            src={Image.ProfileOne}
                            width={150}
                            height={150}
                            alt="Habeeb"
                            className="mx-auto rounded-full border-4 border-white shadow-md"
                        /> 
                      </CardTitle>
                    </div>
                    <CardDescription className="text-black mt-4">
                        <p className='text-xl font-semibold'>Habeeb</p>
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                          <Briefcase size={16} />
                          <p className='text-lg'>Founder</p>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className='bg-transparent hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group'>
                <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <CardHeader>
                    <div className="relative">
                      <div className="absolute -top-1 -right-1 bg-purple-100 p-2 rounded-full">
                        <Code size={18} className="text-purple-600" />
                      </div>
                      <CardTitle>
                        <img 
                            src={Image.ProfileTwo}
                            width={150}
                            height={150}
                            alt="Folorunsho"
                            className="mx-auto rounded-full border-4 border-white shadow-md"
                        /> 
                      </CardTitle>
                    </div>
                    <CardDescription className="text-black mt-4">
                        <p className='text-xl font-semibold'>Folorunsho</p>
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                          <Code size={16} />
                          <p className='text-lg'>Software Engineer</p>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card className='bg-transparent hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group'>
                <div className="absolute inset-0 bg-green-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                <CardHeader>
                    <div className="relative">
                      <div className="absolute -top-1 -right-1 bg-green-100 p-2 rounded-full">
                        <Code size={18} className="text-green-600" />
                      </div>
                      <CardTitle>
                        <img 
                            src={Image.ProfileThree}
                            width={150}
                            height={150}
                            alt="Godfrey"
                            className="mx-auto rounded-full border-4 border-white shadow-md"
                        /> 
                      </CardTitle>
                    </div>
                    <CardDescription className="text-black mt-4">
                        <p className='text-xl font-semibold'>Godfrey</p>
                        <div className="flex items-center justify-center gap-2 text-gray-600">
                          <Code size={16} />
                          <p className='text-lg'>Software Engineer</p>
                        </div>
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
        
    </div>
  )
}

export default Team