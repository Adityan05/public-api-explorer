"use client";

import "./LiveInsightsMarquee.css";
import { useEffect, useRef } from "react";

export default function LiveInsightsMarquee() {
  const sliderRef = useRef(null);
  const trackRef = useRef(null);

  const createSkeletonCard = () => {
    const el = document.createElement("div");
    el.className = "card";
    el.innerHTML = `
    <div class="card-header">
      <div class="skeleton skeleton-label"></div>
      <div class="skeleton skeleton-tag"></div>
    </div>
    <div class="skeleton skeleton-value"></div>
    <div class="skeleton skeleton-subtitle"></div>
  `;
    return el;
  };

  // animation state (kept outside React state intentionally)
  let cardsData = [];
  let x = 0;
  let speed = 0.9;
  let paused = false;
  let totalWidth = 0;
  let rafId = null;

  useEffect(() => {
    const slider = sliderRef.current;
    const track = trackRef.current;

    if (!slider || !track) return;

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);

    slider.addEventListener("mouseenter", onEnter);
    slider.addEventListener("mouseleave", onLeave);

    /* -----------------------------
       Card creation
    ----------------------------- */
    const createCard = (card) => {
      const el = document.createElement("div");
      el.className = "card";
      el.innerHTML = `
        <div class="card-header">
          <span class="label">${card.label}</span>
          <span class="tag">${card.tag}</span>
        </div>
        <div class="value">${card.value}</div>
        <div class="subtitle">${card.subtitle}</div>
      `;
      return el;
    };

    /* -----------------------------
       Render duplicated sets
    ----------------------------- */
    const renderCards = () => {
      track.innerHTML = "";

      // render two full sets
      [...cardsData, ...cardsData].forEach((card) => {
        track.appendChild(createCard(card));
      });

      // calculate width of ONE set
      totalWidth = 0;
      for (let i = 0; i < cardsData.length; i++) {
        totalWidth += track.children[i].offsetWidth + 16; // 16px gap
      }

      // safety for very wide screens
      if (totalWidth < slider.offsetWidth) {
        track.innerHTML += track.innerHTML;
        totalWidth *= 2;
      }
    };

    /* -----------------------------
       Animation loop
    ----------------------------- */
    const animate = () => {
      if (!paused) {
        x -= speed;
        track.style.transform = `translateX(${x}px)`;

        // reset after one full set
        if (Math.abs(x) >= totalWidth) {
          x += totalWidth;
        }
      }
      rafId = requestAnimationFrame(animate);
    };

    /* -----------------------------
       Fetch data (PUBLIC APIs ONLY)
    ----------------------------- */
    const fetchData = async () => {
      try {
        // ---- IP & location ----
        const ip = await fetch("https://ipapi.co/json/").then((r) => r.json());

        // ---- Weather + sun ----
        const weather = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${ip.latitude}&longitude=${ip.longitude}&current=temperature_2m,apparent_temperature,wind_speed_10m,weather_code&daily=sunrise,sunset&timezone=auto`
        ).then((r) => r.json());

        const sunrise = new Date(weather.daily.sunrise[0]);
        const sunset = new Date(weather.daily.sunset[0]);
        const now = new Date();
        const daylightLeft =
          sunset > now
            ? `${Math.floor((sunset - now) / 3600000)}h ${Math.floor(
                ((sunset - now) % 3600000) / 60000
              )}m left`
            : "Sun has set";

        // ---- Air quality ----
        const air = await fetch(
          `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${ip.latitude}&longitude=${ip.longitude}&current=us_aqi,pm2_5`
        ).then((r) => r.json());

        const pm25 = air.current.pm2_5;
        const cigarettes = Math.max(0, Math.round(pm25 / 22));

        // ---- Country facts ----
        const country = await fetch(
          `https://restcountries.com/v3.1/alpha/${ip.country_code}`
        ).then((r) => r.json());

        const countryData = country[0];

        // ---- Random fact ----
        const fact = await fetch(
          "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
        ).then((r) => r.json());

        // ---- Earth fact (Numbers API) ----
        // const dayOfYear = Math.ceil(
        //   (now - new Date(now.getFullYear(), 0, 1)) / 86400000
        // );

        // const earthFact = await fetch(
        //   `https://numbersapi.com/${dayOfYear}/year?json`
        // ).then((r) => r.json());

        // ---- History ----
        const history = await fetch("https://history.muffinlabs.com/date").then(
          (r) => r.json()
        );

        const event =
          history.data.Events[
            Math.floor(Math.random() * history.data.Events.length)
          ];

        const weatherText = (code) => {
          const map = {
            0: "Clear sky",
            1: "Mostly clear",
            2: "Partly cloudy",
            3: "Overcast",
            45: "Fog",
            51: "Drizzle",
            61: "Rain",
            71: "Snow",
            95: "Thunderstorm",
          };
          return map[code] || "Weather";
        };

        cardsData = [
          {
            label: "Your Location",
            tag: "Geo",
            value: `${ip.city}, ${ip.region}`,
            subtitle: `${ip.country_name} · ${ip.latitude.toFixed(
              2
            )}°, ${ip.longitude.toFixed(2)}°`,
          },
          {
            label: "Local Weather",
            tag: "City",
            value: `${Math.round(weather.current.temperature_2m)}°C`,
            subtitle: `${weatherText(
              weather.current.weather_code
            )} · Feels like ${Math.round(
              weather.current.apparent_temperature
            )}°C`,
          },
          {
            label: "Sun Today",
            tag: "Astronomy",
            value: sunrise.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            subtitle: `Sunset ${sunset.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })} · ${daylightLeft}`,
          },
          {
            label: "Wind",
            tag: "Environment",
            value: `${Math.round(weather.current.wind_speed_10m)} km/h`,
            subtitle: "10m surface wind",
          },
          {
            label: "Air Quality Impact",
            tag: "Health",
            value: `AQI ${air.current.us_aqi}`,
            subtitle: `≈ ${cigarettes} cigarettes/day`,
          },
          {
            label: "Your IP",
            tag: "Network",
            value: ip.ip,
            subtitle: `Routed via ${ip.country_name}`,
          },
          {
            label: "Internet Provider",
            tag: "Carrier",
            value: ip.org || "Unknown ISP",
            subtitle: ip.network || "Public network",
          },
          {
            label: "Country Snapshot",
            tag: "Nation",
            value: countryData.name.common,
            subtitle: `Capital ${
              countryData.capital?.[0]
            } · Pop ${countryData.population.toLocaleString()}`,
          },

          {
            label: "On This Day",
            tag: "History",
            value: event.year,
            subtitle: event.text,
          },
          {
            label: "Did You Know?",
            tag: "Fact",
            value: fact.text.split(" ").slice(0, 3).join(" ") + "...",
            subtitle: fact.text,
          },
        ];

        renderCards();
        // animate();
      } catch (err) {
        console.error("LiveInsights fetch error:", err);
      }
    };
    const renderSkeletons = () => {
      track.innerHTML = "";
      for (let i = 0; i < 6; i++) {
        track.appendChild(createSkeletonCard());
      }
      totalWidth = 6 * 280;
    };
    renderSkeletons();
    animate();
    fetchData();

    return () => {
      cancelAnimationFrame(rafId);
      slider.removeEventListener("mouseenter", onEnter);
      slider.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="slider" ref={sliderRef}>
      <div className="track" ref={trackRef}></div>
    </div>
  );
}
