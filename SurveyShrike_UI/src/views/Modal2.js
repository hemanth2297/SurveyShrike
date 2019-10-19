import React from "react";
class Modal extends React.Component {

    render() {
        if (!this.props.modalState) {
            return null;
        }
        return (

            <div className="modal is-active">
                <div className="modal-background" onClick={this.props.closeModal} />
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.props.title}</p>
                        <button className="delete" onClick={this.props.closeModal} />
                    </header>
                    <section className="modal-card-body">
                        <div className="content">
                            {this.props.children}
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <a href="/#" className="button" onClick={this.props.closeModal}>Cancel</a>
                    </footer>
                </div>
            </div>
        );
    }
}
