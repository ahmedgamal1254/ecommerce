const SectionIntroWithImage = ({ title, subtitle, imageUrl }) => {
  return (
    <section
      className="relative h-[300px] md:h-[400px] overflow-hidden my-10 shadow-lg"
    >
      <img
        src={imageUrl}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 drop-shadow">
          {title}
        </h2>
        <p className="text-gray-200 text-lg md:text-xl max-w-xl drop-shadow">
          {subtitle}
        </p>
      </div>
    </section>
  );
};

export default SectionIntroWithImage;