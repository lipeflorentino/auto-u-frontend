export const ChatBox = () => (
  <div className="border rounded-xl p-4">
    <h2 className="font-medium mb-3">Chat</h2>
    <div className="space-y-2 mb-3 max-h-40 overflow-y-auto">
      <div className="bg-gray-100 p-2 rounded-lg w-fit text-sm">
        Pode detalhar mais?
      </div>
      <div className="bg-blue-100 p-2 rounded-lg w-fit ml-auto text-sm">
        Claro! Retornaremos em até 24h.
      </div>
    </div>
    <input
      className="w-full border rounded-lg p-2 text-sm"
      placeholder="Digite uma mensagem..."
    />
  </div>
);