import React, { useState, useEffect } from "react";

import alphabets from "../../1.1 alphabets.json.json";

const EasyABC = () => {
	const [state, setState] = useState({
		alphabets,
		currentPostion: 0,
		currentTick: 0,
		className: "hide",
		random: false,
		sound: false,
	});

	useEffect(() => {
		if (state.sound) {
			if (state.currentPostion === 0) {
				let letterSound = document.querySelector(`audio[data-key="letter"]`);
				letterSound.currentTime = 0;
				letterSound.play();
			} else {
				playSound();
			}
		}
	}, [state.currentPostion]);

	let showImage = state.currentTick !== 0 ? true : false;
	let showLetter = state.currentTick === 2 ? true : false;

	const randomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const next = () => {
		if (state.random) {
			if (state.currentTick < 2) {
				setState((prevState) => {
					return {
						...prevState,
						currentTick: state.currentTick + 1,
						className: "",
					};
				});
			} else {
				setState((prevState) => {
					return {
						...prevState,
						currentPostion: randomNumber(0, 25),
						currentTick: 0,
						className: "hide",
					};
				});
			}
		} else {
			if (state.currentTick < 2) {
				setState((prevState) => {
					return {
						...prevState,
						currentTick: state.currentTick + 1,
						className: "",
					};
				});
			} else if (state.currentPostion === 25) {
				setState((prevState) => {
					return {
						...prevState,
						currentPostion: 0,
						currentTick: 0,
						className: "hide",
					};
				});
			} else {
				setState((prevState) => {
					return {
						...prevState,
						currentPostion: state.currentPostion + 1,
						currentTick: 0,
						className: "hide",
					};
				});
			}
		}
	};

	const previous = () => {
		if (state.currentPostion > 0) {
			setState((prevState) => {
				return {
					...prevState,
					currentPostion: state.currentPostion - 1,
					currentTick: 0,
					className: "hide",
				};
			});
		} else {
			setState((prevState) => {
				return {
					...prevState,
					currentPostion: state.alphabets.length - 1,
					currentTick: 0,
					className: "hide",
				};
			});
		}
	};

	const playSound = () => {
		let letterSound = document.querySelector(`audio[data-key="letter"]`);
		let wordSound = document.querySelector(`audio[data-key="word"]`);

		if (state.sound) {
			if (state.currentTick === 0) {
				letterSound.currentTime = 0;
				letterSound.play();
			} else {
				wordSound.currentTime = 0;
				wordSound.play();
			}
		}
	};

	const manualPlaySound = () => {
		let letterSound = document.querySelector(`audio[data-key="letter"]`);
		let wordSound = document.querySelector(`audio[data-key="word"]`);

		if (state.currentTick === 0) {
			letterSound.currentTime = 0;
			letterSound.play();
		} else {
			wordSound.currentTime = 0;
			wordSound.play();
		}
	};

	const switchRandom = () => {
		setState((prevState) => {
			return {
				...prevState,
				random: !state.random,
			};
		});
		next();
	};

	const switchSound = () => {
		setState((prevState) => {
			return {
				...prevState,
				sound: !state.sound,
			};
		});
	};

	return (
		<div className="game">
			<span className="random-label">Random Letters: </span>
			<label htmlFor="" className="switch" onClick={() => switchRandom()}>
				<input type="checkbox" defaultValue="false" checked={state.random} />
				<div className="slider round"></div>
			</label>
			<span className="random-label">Sound: </span>
			<label htmlFor="" className="switch" onClick={() => switchSound()}>
				<input type="checkbox" defaultValue="false" checked={state.sound} />
				<div className="slider round"></div>
			</label>
			<div className="option">
				<div className="fields">
					<div className="field-block">{state.alphabets[state.currentPostion].letter}</div>
					<audio src={state.alphabets[state.currentPostion].letterSound} data-key="letter" />
				</div>
			</div>
			<div className="buttons">
				<a href="#" className="button prev" onClick={() => previous()}>
					Previous
				</a>
				<a href="#" className="button sound" onClick={() => manualPlaySound()}>
					Play Sound Again
				</a>
				<a href="#" className="button next" onClick={() => next()}>
					Next
				</a>
			</div>
			<div className="option">
				<div className="fields">
					<div className="field-block">
						<div className="left-field">
							{!showImage && <div className="placeholder-span">Click Next to view image</div>}
							<img
								src={state.alphabets[state.currentPostion].image}
								className={`letter-image ${state.className}`}
								alt={state.alphabets[state.currentPostion].word}
							/>
							<audio src={state.alphabets[state.currentPostion].wordSound} data-key="word" />
						</div>
						<div className="right-field">
							{!showLetter && <div className="placeholder-span ">Click Next to view spelling</div>}
							{showLetter && (
								<div className={`word ${state.className}`}>
									{state.alphabets[state.currentPostion].word.toUpperCase()}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EasyABC;
