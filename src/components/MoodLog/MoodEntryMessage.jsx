const MoodEntryMessage = () => {

    return (
        <>
         <div className="ml-10 mr-0 max-w-full my-12 " id="mood-log">
        <h1 className="text-4xl text-center sm:text-5xl xl:text-7xl 2xl:text-8xl">
        How do you <span className='text-vibrant-yellow'>feel </span>today?
        </h1>
        <div className="bg-vibrant-yellow ml-30 mr-5 rounded-md transition-opacity duration-1000 ease">
            <p id="result"></p>
            <p id="countdown"></p>
          </div>
        </div>
        </>
    );
}

export default MoodEntryMessage;
