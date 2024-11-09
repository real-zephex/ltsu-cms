export function handleModal(id: string, action: "show" | "hide") {
  
  const modal = document.getElementById(id) as HTMLDialogElement;
  if (modal) {
    if (action === "show") {
      modal.showModal();
    } else {
      modal.close();
    }
  }
}
