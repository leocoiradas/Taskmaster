import React from "react";

function Dashboard({children, sectionName}) {
    return (
      <section className="w-full max-h-[90dvh] flex flex-col justify-center items-center">
        <article className="h-12 w-full text-3xl flex justify-center items-center font-semibold p-4 shadow-md">
          <h3>{sectionName}</h3>
        </article>
          
          <article className="w-full h-full flex flex-wrap justify-center items-center p-3 gap-6 overflow-y-scroll">
            {children}
          </article>
          
        
      </section>
  );
}

export default Dashboard;