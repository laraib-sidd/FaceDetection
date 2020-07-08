import React, { Component } from "react";
import "./App.css";
import Particles from "react-particles-js";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Signin from "./Components/Signin/Signin";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Register from "./Components/Register/Register";

const particleOptions = {
	particles: {
		number: {
			value: 50,
			density: {
				enable: true,
				value_area: 800,
			},
		},
	},
};

const intialState = {
	input: "",
	imageUrl: "",
	box: {},
	route: "signin",
	isSignedIn: false,
	user: {
		id: "",
		name: "",
		email: "",
		entries: 0,
		joined: "",
	},

}

class App extends Component {
	constructor() {
		super();
		this.state = intialState;
	}

	loadUser = (data) => {
		this.setState({
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined,
			},
		});
	};

	onInputChange = (event) => {
		this.setState({
			input: event.target.value,
		});
	};

	calulateFaceLocation = (resp) => {
		const clarifaiFace =
			resp.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById("inputimage");
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftcol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightcol: width - clarifaiFace.right_col * width,
			bottowRow: height - clarifaiFace.bottow_row * height,
		};
	};

	displayFaceBox = (box) => {
		this.setState({
			box: box,
		});
	};

	onButtonSubmit = () => {
		this.setState({
			imageUrl: this.state.input,
		});
		fetch("http://loacalhost:3018/imageurl", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				input: this.state.input,
			}),
		})
			.then(response => response.json())
			.then((response) => {
				if (response) {
					fetch("http://loacalhost:3018/image", {
						method: "put",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							id: this.state.user.id,
						}),
					})
						.then((response) => response.json())
						.then((count) => {
							this.setState(
								Object.assign(this.state.user, {
									entries: count,
								})
							);
						})
						.catch(console.log)
				}
				this.displayFaceBox(this.calulateFaceLocation(response));
			})
			.catch((err) => console.log(err));
	};

	onRouteChange = (route) => {
		if (route === "signout") {
			this.setState(intialState);
		} else if (route === "home") {
			this.setState({
				isSignedIn: true,
			});
		}
		this.setState({
			route: route,
		});
	};

	render() {
		const { isSignedIn, imageUrl, route, box } = this.state;
		return (
			<div className="App">
				<Particles className="particles" params={particleOptions} />
				<Navigation
					isSignedIn={isSignedIn}
					onRouteChange={this.onRouteChange}
				/>
				{route === "home" ? (
					<div>
						<Logo />
						<Rank
							name={this.state.user.name}
							entries={this.state.user.entries}
						/>
						<ImageLinkForm
							onInputChange={this.onInputChange}
							onButtonSubmit={this.onButtonSubmit}
						/>
						<FaceRecognition box={box} imageUrl={imageUrl} />
					</div>
				) : route === "signin" ? (
					<Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
				) : (
							<Register
								loadUser={this.loadUser}
								onRouteChange={this.onRouteChange}
							/>
						)}
			</div>
		);
	}
}

export default App;
