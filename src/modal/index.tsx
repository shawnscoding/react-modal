import React, { Component, ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalContainerProps {
  children: ReactNode;
}

class ModalContainer extends Component<ModalContainerProps> {
  lastFocusedElInModal: HTMLElement | null = null;
  nodeFocusedBeforeActivation: HTMLElement | null = null;

  handleKeyboardEvent = (e: KeyboardEvent) => {
    //Fetch node list from which required elements could be grabbed as needed.
    const modal = document.getElementById("modal") as HTMLDivElement;
    const lastFocusable = document.getElementById(
      "lastFocusable"
    ) as HTMLDivElement;
    const focusable = modal.querySelectorAll(
      'button, [href], input, select, textarea, li, a,[tabindex]:not([tabindex="-1"])'
    );
    const firstFocusable = focusable[0] as HTMLElement;
    const visableFirstFocusable = focusable[1] as HTMLElement;
    const visableLastFocusable = focusable[focusable.length - 2] as HTMLElement;

    if (e.ctrlKey || e.altKey) {
      return;
    }

    const keys = {
      Tab: () => {
        //9 = TAB

        console.log("this.lastFocusedElInModal", this.lastFocusedElInModal);
        console.log("e.target", e.target);
        const target = e.target as HTMLElement;

        if (e.shiftKey && target === firstFocusable) {
          visableLastFocusable?.focus();
          this.lastFocusedElInModal = visableLastFocusable;
        } else if (target === lastFocusable) {
          visableFirstFocusable?.focus();
          this.lastFocusedElInModal = visableFirstFocusable;
        } else {
          this.lastFocusedElInModal = target;
        }
      }
    };

    if (keys[e.key as keyof typeof keys]) {
      const key = e.key as "Tab";
      keys[key]();
    }
  };

  handleFocusIn = (e: FocusEvent) => {
    const target = e.target as HTMLElement;
    const modal = document.getElementById("modal") as HTMLDivElement;
    console.log("focus e", e);
    if (modal && !modal.contains(target)) {
      this.lastFocusedElInModal?.focus();
    }
  };

  componentDidMount() {
    window.addEventListener("keyup", this.handleKeyboardEvent);
    window.addEventListener("focusin", this.handleFocusIn);
    console.log("activeElement", document.activeElement);

    this.nodeFocusedBeforeActivation = document.activeElement as HTMLElement;

    setTimeout(() => {
      const firstFocusable = document.getElementById(
        "firstFocusable"
      ) as HTMLElement;
      if (firstFocusable) {
        firstFocusable.focus();
        this.lastFocusedElInModal = firstFocusable;
      }
    });
  }

  componentDidUpdate() {
    console.log("activeElement", document.activeElement);
    this.nodeFocusedBeforeActivation = document.activeElement as HTMLElement;
  }

  shouldComponentUpdate(nextProps: Props) {
    const { children } = this.props;
    return children !== nextProps.children;
  }

  componentWillUnmount() {
    window.removeEventListener("keyup", this.handleKeyboardEvent);
    window.removeEventListener("focusin", this.handleFocusIn);

    console.log(
      "nodeFocusedBeforeActivation",
      this.nodeFocusedBeforeActivation
    );
    if (this.nodeFocusedBeforeActivation) {
      this.nodeFocusedBeforeActivation.focus();
    }
  }

  render() {
    const { children } = this.props;
    return (
      <div id="modal" className="modal">
        <div id="firstFocusable" tabIndex={0}></div>

        {children}
        <div id="lastFocusable" tabIndex={0}></div>
      </div>
    );
  }
}

interface Props {
  open: boolean;
  children: ReactNode;
}

class Modal extends Component<Props> {
  state = {};

  render() {
    const { open, children } = this.props;
    console.log("open", open);
    if (open)
      return ReactDOM.createPortal(
        <ModalContainer>{children}</ModalContainer>,
        document.body
      );
    return "";
  }
}

export default Modal;
