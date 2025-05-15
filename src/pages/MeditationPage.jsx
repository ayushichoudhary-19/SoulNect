import Meditation from "../components/Meditation/Meditation";
import MeditationWelcomeMessage from "../components/Meditation/MeditationWelcomeMessage";
const MeditationPage = () => {

    return (
        <div className="min-h-70vh">
        <MeditationWelcomeMessage/>
        <Meditation/>
        </div>
    );
};

export {MeditationPage};