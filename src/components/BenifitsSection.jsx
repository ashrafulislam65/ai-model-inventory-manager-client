const BenefitsSection = () => {
  const benefits = [
    {
      title: "Reduce Stock Loss",
      desc: "Prevent overstocking and understocking with accurate tracking.",
      icon: "📉",
    },
    {
      title: "Save Management Time",
      desc: "Automate inventory tasks and focus on growing your business.",
      icon: "⏱️",
    },
    {
      title: "Accurate Inventory Data",
      desc: "Get real-time updates and reliable reports anytime.",
      icon: "📊",
    },
    {
      title: "Increase Business Profit",
      desc: "Make smarter decisions using data-driven insights.",
      icon: "💰",
    },
  ];

  return (
    <section className="py-20 px-20 bg-linear-to-b from-base-100 to-base-200">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold">
            Real Benefits for Your Business
          </h2>
          <p className="opacity-70 mt-3">
            Designed to solve real inventory management problems
          </p>
        </div>

        {/* Benefits */}
        <div className="grid lg:grid-cols-2 gap-10">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-5 items-start p-6 rounded-xl 
                         bg-base-100 shadow-md hover:shadow-lg 
                         transition-all"
            >
              {/* Icon */}
              <div className="text-4xl">{item.icon}</div>

              {/* Text */}
              <div>
                <h3 className="font-semibold text-lg mb-1">
                  {item.title}
                </h3>
                <p className="text-sm opacity-70">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;
