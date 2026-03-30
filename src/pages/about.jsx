import { Shield, Target, Zap, Code2, Users } from "lucide-react";

export default function AboutSection() {
    return(
        <section className="bg-[#1a1c21] text-white py-20 px-6 -mt-17">
            <div className="max-w-6xl mx-auto px-6 py-10">

                <div className="text-center space-y-5">
                    <span className="bg-green-600/20 text-green-400 px-4 py-1 rounded-full text-sm">
                    About BountyHub
                    </span>
                    <h2 className="text-7xl font-bold py-3">
                        Bridging the Gap Between {" "}
                        <span className="text-green-500">Contributors & Maintainers</span>
                    </h2>
                    <p className="text-gray-400 max-w-3xl mx-auto text-lg mb-5 mt-5">
                    BountyHub is revolutionizing open-source development by creating a
                    marketplace where project maintainers can incentivize contributions
                    and developers can earn real money for solving meaningful problems.
                    </p>
                </div>

                <div className="bg-[#111827] p-10 rounded-2xl text-center space-y-4 mb-5">
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                    <p className="txt-gray-400 max-w-3xl mx-auto">
                    We believe that open-source software powers the world, but
            contributors often go unrewarded for their valuable work. Our
            platform creates a sustainable ecosystem where quality contributions
            are recognized and compensated fairly.
                    </p>
                </div>

                <div className="space-y-12">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                        icon = {<Target className="text-green-500" size={28} />}
                        title="Quality First"
                        desc="Every bounty is reviewed to ensure high-quality contributions"/>
                        <FeatureCard
                        icon = {<Shield className="text-green-500" size={28} />}
                        title="Secure payments"
                        desc="Every bounty is reviewed to ensure high-quality contributions"/>
                        <FeatureCard
                        icon = {<Zap className="text-green-500" size={28} />}
                        title="Fast & Efficient"
                        desc="Streamlines process from issue posting to payment completion "/>
                    </div>

                <div className="flex flex-col md:flex-row justify-between items-center bg-[#111827] p-8 rounded-2xl text-center md:text-left">
                    <div className="text-green-500 text-3xl font-bold">2.5M+</div>
                    <div className="text-gray-400 ">Total Bounties Paid</div>
                    <div className="text-2xl font-bold">15K+</div>
                    <div className="text-gray-400">Issues Resolved</div>
                <div className="text-2xl font-bold">3K+</div>
                <div className="text-gray-400">Active Contributors</div>
                </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-center mt-15">How It Works</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <StepCard
                        number="1"
                        title="Post a Bounty"
                        desc="Maintainers post issue with attached bounties, specifying requirements and rewards"/>
                         <StepCard
                         number="2"
                        title="Solve & Submit"
                        desc="Contributors claim bounties, work on solutions, and submit pull requests"/>
                        <StepCard
                        number="3"
                        title="Get Rewarded"
                        desc="Once approved and merged, contributors receive their bounty payment automatically"/>
                    </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-3xl font-bold text-center mt-15">Our Values</h3>
                  <p className="text-gray-400 text-center max-w-2xl mx-auto">
                  The principles that guide everything we do
                  </p>
                  <div className="grid md:grid-cols-2 gap-8 text-center">
                    <ValueCard 
                    icon={<Code2 className="text-green-500" size={28} />}
                    title="Open Source First"/>
                    <ValueCard 
                    icon={<Users className="text-green-500" size={28} />}
                    title="Community Driven"/>
                  </div>
                </div>

                
            </div>
        </section>
    )
}

function FeatureCard({ icon, title, desc }) {
    return (
      <div className="p-6 rounded-xl bg-[#0d1117] border border-white/10 space-y-3">
        <div className="p-3 rounded-full bg-green-500/10 border border-green-800 inline-block">
          {icon}
        </div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
    );
  }

  function StepCard({ number, title, desc }) {
    return (
      <div className="p-6 rounded-xl bg-[#0d1117] border border-white/10 space-y-3">
        <div className="text-green-500 font-bold text-2xl">{number}</div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
    );
  }

  
function ValueCard({ icon, title }) {
  return (
    <div className="p-6 rounded-xl bg-[#0d1117] border border-white/10 space-y-3 flex flex-col items-center">
      <div className="p-3 rounded-full bg-green-500/10 border border-green-800 inline-block">
        {icon}
      </div>
      <h4 className="font-semibold">{title}</h4>
    </div>
  );
}
