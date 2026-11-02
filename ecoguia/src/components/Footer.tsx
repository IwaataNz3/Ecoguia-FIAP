interface FooterProps {
  texto: string;
}

// Componente de rodapé global
export default function Footer({ texto }: FooterProps) {
  return (
    <footer className="bg-white text-center py-10 mt-16 border-t border-slate-200 text-slate-500 text-sm">
      <div className="max-w-[1200px] mx-auto px-4">
        <p>{texto}</p>
      </div>
    </footer>
  );
}
