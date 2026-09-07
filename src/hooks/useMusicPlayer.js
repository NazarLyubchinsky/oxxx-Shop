// import { useEffect, useState } from "react";



// export const useMusicPlayer = () => {
// 	const [audio] = useState(new Audio())
// 	const [playing, setPlaying] = useState(false)
// 	const [currentTrack, setCurrentTrack] = useState(null)


// 	const handleTrackClick = (track) => {
// 		setPlaying((prev) => {
// 			const isPlaying = track.sys.id === currentTrack?.sys?.id ? !prev : true;

// 			audio.src = track.link.url;
// 			!isPlaying ? audio.pause() : audio.play();

// 			return isPlaying;
// 		});

// 		setCurrentTrack(track);
// 	};

// 	useEffect(() => {
// 		return () => {
// 			audio.pause()
// 		};
// 	}, [audio])


// 	return { playing, handleTrackClick, currentTrack }
// }