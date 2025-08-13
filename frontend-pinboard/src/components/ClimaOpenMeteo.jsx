import React, { useEffect, useState } from 'react';
import { fetchWeatherApi } from 'openmeteo';
import '../styles/Clima.css';
// Badge de clima con datos de Open‑Meteo

/*
 Guía rápida para la expo:
 1) Qué es: Un badge compacto que muestra el clima actual usando Open‑Meteo.
 2) Ubicación: Si la prop useGeo está activa, pide permiso; si aceptas usa tu posición, si no usa las coords que vienen desde App.jsx (fallback).
 3) Datos: Se consulta la serie horaria de temperatura (temperature_2m) y se elige el valor de la hora actual según tu zona horaria.
 4) Diseño: Solo estiliza con Clima.css; no toca el resto de la UI.
 5) Fallback y debug: Si algo falla, muestra 18°C “Parcial”; con debug imprime en consola la respuesta para verificar.
*/

const ICONOS = {
  soleado: '☀️',
  nublado: '☁️',
  lluvia: '🌧️',
  parcial: '⛅',
};

const LABELS = {
  soleado: 'Soleado',
  nublado: 'Nublado',
  lluvia: 'Lluvia',
  parcial: 'Parcial',
};

function ClimaOpenMeteo({ lat, lon, ciudad, size = 'sm', estadoFijo, debug = false, useGeo = false }) {
  // - useGeo: activa geolocalización del navegador
  // - ciudad: texto mostrado junto al estado
  // Estado
  const [temp, setTemp] = useState(null);
  const [estado, setEstado] = useState(estadoFijo || 'parcial');
  const [error, setError] = useState(null);
  // Coordenadas (props o fallback interno)
  const [coords, setCoords] = useState({
    lat: typeof lat === 'number' ? lat : -2.1700,
    lon: typeof lon === 'number' ? lon : -79.9224,
  });
  const [geoLocked, setGeoLocked] = useState(false);
  // Geolocalización resuelta (éxito o error)
  const [geoResolved, setGeoResolved] = useState(!useGeo);

  // Geolocalización (opcional)
  // permite/deniega el permiso y muestra cómo cambia entre tu posición y el fallback.
  useEffect(() => {
    if (!useGeo) return;
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      if (debug) console.warn('[Clima][Geo] Geolocalización no disponible');
      setGeoResolved(true);
      return;
    }
    const id = navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (debug) console.log('[Clima][Geo] Permiso OK', { latitude, longitude });
        setCoords({ lat: latitude, lon: longitude });
        setGeoLocked(true);
        setGeoResolved(true);
      },
      (err) => {
        if (debug) console.warn('[Clima][Geo] Denegado/ERROR', err);
        setGeoLocked(false);
        setCoords({
          lat: typeof lat === 'number' ? lat : coords.lat,
          lon: typeof lon === 'number' ? lon : coords.lon,
        });
        setGeoResolved(true);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
    return () => { /* no-op, getCurrentPosition no mantiene watch */ };
  }, [useGeo, debug]);

  // Props → coords (si no hay geolocalización)
  useEffect(() => {
    if (!useGeo) {
      const next = {
    lat: typeof lat === 'number' ? lat : coords.lat,
    lon: typeof lon === 'number' ? lon : coords.lon,
      };
      setCoords((prev) => (prev.lat !== next.lat || prev.lon !== next.lon ? next : prev));
    }
  }, [lat, lon, useGeo]);

  // Cargar clima (Open‑Meteo)
  // Tip de demo: activa la prop debug para ver en consola el índice horario usado y la temperatura elegida.
  useEffect(() => {
    let cancel = false;
    async function cargar() {
      try {
        if (useGeo && !geoResolved) return; // esperar resolución de geolocalización
        setError(null);
        const params = {
          latitude: coords.lat,
          longitude: coords.lon,
          hourly: 'temperature_2m',
        };
        const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);
  const response = responses[0];
  const latitude = response.latitude();
  const longitude = response.longitude();
  const elevation = response.elevation();
  const utcOffsetSeconds = response.utcOffsetSeconds();
        const hourly = response.hourly();
    const temps = hourly.variables(0).valuesArray();
    const start = Number(hourly.time()) + utcOffsetSeconds; // seg epoch local
    const interval = hourly.interval(); // seg entre muestras
        const nowSec = Math.floor(Date.now() / 1000);
    let idx = Math.floor((nowSec - start) / interval);
        if (idx < 0) idx = 0;
        if (idx >= temps.length) idx = temps.length - 1;

        const t = Math.round(temps[idx]);
        if (debug) {
          const when = new Date((start + idx * interval) * 1000);
          console.log('[Clima][OpenMeteo] OK', {
            apiLat: latitude,
            apiLon: longitude,
            elevation,
            utcOffsetSeconds,
            index: idx,
            atLocal: when.toISOString(),
            temp: t,
          });
        }
        if (!cancel) {
          setTemp(t);
          if (!estadoFijo) {
            // Heurística simple por temperatura
            const nuevoEstado = t >= 26 ? 'soleado' : t >= 18 ? 'parcial' : t >= 12 ? 'nublado' : 'lluvia';
            setEstado(nuevoEstado);
          }
        }
      } catch (e) {
        if (!cancel) {
          setError('No se pudo obtener el clima');
          if (debug) {
            console.error('[Clima][OpenMeteo] ERROR', e);
          }
          // Fallback visual
          setTemp(null);
          setEstado(estadoFijo || 'parcial');
        }
      }
    }
    cargar();
    return () => { cancel = true; };
  }, [coords.lat, coords.lon, estadoFijo, debug, useGeo, geoResolved]);

  const tempMostrar = temp ?? 18; // fallback amigable
  const icono = ICONOS[estado] || ICONOS.parcial;
  const label = LABELS[estado] || LABELS.parcial;

  return (
    <span
      className={`clima-badge ${size} ${estado}`}
      title={`Clima: ${label}${ciudad ? ` · ${ciudad}` : ''} | Temp: ${tempMostrar}°C`}
    >
      <span className="icon" role="img" aria-label="clima">{icono}</span>
      <span className="info">
        <span className="temp">{tempMostrar}°C</span>
        <span className="meta">{label}{ciudad ? ` · ${ciudad}` : ''}</span>
      </span>
    </span>
  );
}

export default ClimaOpenMeteo;
