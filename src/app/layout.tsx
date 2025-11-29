import './globals.css'

export const metadata = {
  title: 'ELA+',
  description: 'Seu app de saúde e bem-estar completo',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
