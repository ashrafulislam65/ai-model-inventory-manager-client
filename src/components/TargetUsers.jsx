const TargetUsers = () => {
  return (
    <section className="py-20 px-20 bg-base-100">
      <div className="container mx-auto px-4 text-center">
        
        <h2 className="text-3xl font-bold mb-12">
          Who Is This For?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            "Small Businesses",
            "Retail Shops",
            "Warehouse Managers",
            "Online Sellers",
          ].map((role, idx) => (
            <div key={idx} className="card bg-base-200 shadow">
              <div className="card-body">
                <h3 className="font-semibold">{role}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TargetUsers;
