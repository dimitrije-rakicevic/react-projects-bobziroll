import * as Dialog from "@radix-ui/react-dialog";
import "./LogoutPrompt.css"; // Dodaj odgovarajući CSS fajl

const LogoutPrompt = ({ open, onClose, onConfirm }) => {

  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Overlay (pozadina) */}
        <Dialog.Overlay className="dialog-overlay" />

        {/* Glavni modal */}
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">
            Are you sure you want to log out?
          </Dialog.Title>
          <Dialog.Description className="dialog-description">
            If you continue, you will log out of your account.
          </Dialog.Description>
          <div className="dialog-buttons">
            <button className="dialog-cancel" onClick={onClose}>
              Stay logged in
            </button>
            <button
              className="dialog-confirm"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Log out
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default LogoutPrompt;
