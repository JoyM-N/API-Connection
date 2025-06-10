import * as Dialog from '@radix-ui/react-dialog';

export default function ConfirmDialog({ open, onConfirm, onCancel }) {
  return (
    <Dialog.Root open={open} onOpenChange={onCancel}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/40" />
        <Dialog.Content className="bg-white rounded p-6 w-[350px] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-lg">
          <Dialog.Title className="text-lg font-semibold mb-4">Confirm Delete</Dialog.Title>
          <p className="mb-4">Are you sure you want to delete this task?</p>
          <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="px-4 py-2 rounded border border-gray-300">Cancel</button>
            <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
