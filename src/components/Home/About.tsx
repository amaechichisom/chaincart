import { Card, CardContent } from "@/components/ui/card";

function About() {
  return (
    <Card className="flex items-center p-4 space-x-4 bg-border/40  border border-border shadow-sm container mx-auto">
        <CardContent className="p-0 text-center md:text-left w-full">
        <h3 className="text-base md:text-lg  font-semibold text-input">At Chaincart, we make property transactions seamless with XION</h3>
        <p className="text-input-secondary mt-1 text-sm md:text-base">From stunning homes to prime commercial spaces, our real estate eCommerce platform offers a trusted, user-friendly experience to browse, buy, or list properties — all in one place.</p>
        </CardContent>
    </Card>
  )
}

export default About