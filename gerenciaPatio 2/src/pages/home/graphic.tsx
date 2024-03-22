import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { useSpring, animated } from 'react-spring';

const Graphic: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart>();

  const { y } = useSpring({
    from: { y: 500 },
    to: { y: 0 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        chartInstanceRef.current = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Entrada', 'Saída', 'Disponíveis'],
            datasets: [{
              label: 'Número de Veículos',
              data: [10, 5, 15], // Quantidade fictícia de veículos
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(9, 73, 116, 0.5)',
                'rgba(75, 192, 192, 0.5)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              x: {
                grid: {
                  display: false 
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  display: false 
                }
              }
            }
          }
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h2>Gráficos</h2>
      <animated.canvas
        ref={chartRef}
        style={{
          transform: y.interpolate((value: number) => `translateY(${value}px)`)
        }}
      />
    </div>
  );
};

export default Graphic;
