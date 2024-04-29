import React, { useEffect, useState, useMemo } from 'react';
import styles from './raining.module.css';

function RainingMoney() {
  const [coins, setCoins] = useState([]);

  const coinClasses = useMemo(
    () => [
      styles.coin1,
      styles.coin2,
      styles.coin3,
      styles.coin4,
      styles.coin5,
      styles.coin6,
      styles.coin4,
      styles.coin5,
      styles.coin6,
    ],
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const randomX = Math.random() * window.innerWidth;
      const randomY = -50; // Pornim moneda de sus
      const randomClassIndex = Math.floor(Math.random() * coinClasses.length);
      setCoins(prevCoins => [
        ...prevCoins,
        {
          id: Date.now(),
          x: randomX,
          y: randomY,
          speed: Math.random() * 2 + 1,
          className: coinClasses[randomClassIndex],
        },
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, [coinClasses]);

  useEffect(() => {
    const moveCoins = () => {
      setCoins(prevCoins =>
        prevCoins.map(coin => ({
          ...coin,
          y: coin.y + coin.speed,
        }))
      );
    };

    const animationFrame = requestAnimationFrame(moveCoins);

    return () => cancelAnimationFrame(animationFrame);
  }, [coins]);

  return (
    <div className={styles.App}>
      {coins.map(coin => (
        <div
          key={coin.id}
          className={`${styles.coin} ${coin.className}`}
          style={{ left: coin.x, top: coin.y }}
        />
      ))}
    </div>
  );
}

export default RainingMoney;
