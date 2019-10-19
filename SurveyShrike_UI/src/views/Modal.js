import React from 'react';

export default class UploadPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = { file: null };
        this.onChange = this.onChange.bind(this);
        this.resetFile = this.resetFile.bind(this);
    }
    onChange = (event) => {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            this.setState({
                file: reader.result
            });
        };
    }

    resetFile(event) {
        event.preventDefault();
        this.setState({ file: null });
    }
    render() {
        return (
            <div>
                <input type="file" onChange={this.onChange} />
                {this.state.file && (
                    <div style={{ textAlign: "center" }}>
                        <button onClick={this.resetFile}>Remove File</button>
                    </div>
                )}
                <img style={{ width: "200px", height: "200px" }} id="imageContainer" src={this.state.file} alt="" />
            </div>
        );
    }
}
