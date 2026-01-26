'use client';
import { Factory } from 'lucide-react';
import { useTheme } from 'next-themes';
import React from 'react';

interface Props {
  className?: string;
  width: number;
  height: number;
}

export const Logo: React.FC<Props> = ({ width, height }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ждём, пока компонент смонтируется на клиенте
  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    // ⚠️ Пока Next.js не знает тему (на сервере) — не рендерим SVG
    // Это предотвращает расхождение HTML между SSR и клиентом
    return <div style={{ width, height }} />;
  }

  const currentTheme = theme === 'system' ? resolvedTheme : theme;
  const color = currentTheme === 'light' ? '#0A0471FF' : '#ffffff';
  return (
    <div>
      <Factory width={width} height={height} color={color} />
    </div>
  );
};
