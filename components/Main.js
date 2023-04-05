import React from "react";

const Main = () => {
  return (
    <section className=" flex flex-col sm:flex-row items-center gap-5 py-16 ">
      <article className=" pb-10 ">
        <h2 className=" font-bold text-[2rem]">
          Discover the Latest Business Innovations
        </h2>
        <p>
          From smartphones, laptops, and tablets to digital signage, displays,
          and memory, Tronic store offers tailored solutions that meet your
          business needs.
        </p>
      </article>
      <article>
        <img src="/image3.jpeg" alt="" />
      </article>
    </section>
  );
};

export default Main;
