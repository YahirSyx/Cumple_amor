document.addEventListener("DOMContentLoaded", () => {
    // --- 1. Lógica del Video y Audio ---
    const video = document.getElementById("musicaFondo");
    const boton = document.getElementById("botonMusica");

    boton.addEventListener("click", async () => {
        if (video.paused) {
            try {
                video.classList.remove("video-oculto");
                video.classList.add("video-visible");
                await video.play();
                boton.textContent = "⏸ Pausar nuestra canción";
            } catch (error) {
                boton.textContent = "❌ No se pudo reproducir";
                console.error("Error al reproducir:", error);
            }
        } else {
            video.pause();
            boton.textContent = "🎵 Reproducir nuestra canción";
            video.classList.remove("video-visible");
            video.classList.add("video-oculto");
        }
    });

    // --- 2. Motor de Flores Orgánicas Procedurales de Fondo ---
    const canvas = document.getElementById("canvasFlores");
    const ctx = canvas.getContext("2d");

    function ajustarCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    ajustarCanvas();
    window.addEventListener("resize", ajustarCanvas);

    const coloresFlores = [
        "rgba(255, 107, 157, 0.85)", 
        "rgba(255, 179, 198, 0.85)", 
        "rgba(255, 209, 102, 0.85)", 
        "rgba(239, 71, 111, 0.85)", 
        "rgba(199, 125, 255, 0.85)",
        "rgba(255, 255, 255, 0.9)"
    ];

    class FlorProcedural {
        constructor(x, y, maxRadius) {
            this.x = x;
            this.y = y;
            this.currentRadius = 0;
            this.maxRadius = maxRadius || Math.random() * 35 + 25;
            this.growthSpeed = Math.random() * 0.4 + 0.2;
            this.numPetals = Math.floor(Math.random() * 3) + 5; 
            this.color = coloresFlores[Math.floor(Math.random() * coloresFlores.length)];
            this.angleOffset = Math.random() * Math.PI;
        }

        update() {
            if (this.currentRadius < this.maxRadius) {
                this.currentRadius += this.growthSpeed;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angleOffset);

            for (let i = 0; i < this.numPetals; i++) {
                const angulo = (i * 2 * Math.PI) / this.numPetals;
                ctx.save();
                ctx.rotate(angulo);
                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.ellipse(0, this.currentRadius * 0.5, this.currentRadius * 0.35, this.currentRadius * 0.6, 0, 0, 2 * Math.PI);
                ctx.fill();
                ctx.restore();
            }

            ctx.beginPath();
            ctx.arc(0, 0, this.currentRadius * 0.22, 0, 2 * Math.PI);
            ctx.fillStyle = "#fff275";
            ctx.fill();
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = "rgba(0,0,0,0.08)";
            ctx.stroke();

            ctx.restore();
        }
    }

    let racimosFlores = [];

    function inicializarJardin() {
        racimosFlores = [];
        const puntosRacimos = [
            {x: canvas.width * 0.15, y: canvas.height * 0.2},
            {x: canvas.width * 0.85, y: canvas.height * 0.2},
            {x: canvas.width * 0.1,  y: canvas.height * 0.75},
            {x: canvas.width * 0.9,  y: canvas.height * 0.75},
            {x: canvas.width * 0.3,  y: canvas.height * 0.88},
            {x: canvas.width * 0.7,  y: canvas.height * 0.88},
            {x: canvas.width * 0.12, y: canvas.height * 0.48},
            {x: canvas.width * 0.88, y: canvas.height * 0.48}
        ];

        puntosRacimos.forEach(p => {
            const cantidad = Math.floor(Math.random() * 4) + 5;
            for(let i = 0; i < cantidad; i++) {
                const offsetX = (Math.random() - 0.5) * 80;
                const offsetY = (Math.random() - 0.5) * 60;
                racimosFlores.push(new FlorProcedural(p.x + offsetX, p.y + offsetY, Math.random() * 25 + 20));
            }
        });
    }

    inicializarJardin();
    window.addEventListener("resize", inicializarJardin);

    // --- 3. Lógica de Fuegos Artificiales Realistas ---
    const coloresFuegos = ["#ff3366", "#ffcc00", "#33ccff", "#9933ff", "#33ff66", "#ffffff", "#ff66ff"];

    function lanzarFuegoArtificial() {
        const origenX = Math.random() * 80 + 10; 
        const origenY = Math.random() * 45 + 10; 

        const cohete = document.createElement("div");
        cohete.classList.add("cohete");
        cohete.style.left = `${origenX}vw`;
        cohete.style.setProperty("--destino-y", `${origenY}vh`);
        document.body.appendChild(cohete);

        setTimeout(() => {
            cohete.remove(); 

            const totalChispas = 55;
            for (let i = 0; i < totalChispas; i++) {
                const chispa = document.createElement("div");
                chispa.classList.add("chispa");
                
                const colorSeleccionado = coloresFuegos[Math.floor(Math.random() * coloresFuegos.length)];
                chispa.style.backgroundColor = colorSeleccionado;
                chispa.style.color = colorSeleccionado;
                
                chispa.style.left = `${origenX}vw`; 
                chispa.style.top = `${origenY}vh`; 

                const angulo = Math.random() * Math.PI * 2;
                const distancia = Math.random() * 180 + 40; 
                const tx = Math.cos(angulo) * distancia;
                const ty = Math.sin(angulo) * distancia + 30; 

                chispa.style.setProperty("--tx", `${tx}px`);
                chispa.style.setProperty("--ty", `${ty}px`);

                document.body.appendChild(chispa);

                setTimeout(() => {
                    chispa.remove();
                }, 1200);
            }
        }, 600); 
    }

    setInterval(lanzarFuegoArtificial, 1100);

    // --- 4. Bucle Principal de Renderizado ---
    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        racimosFlores.forEach(flor => {
            flor.update();
            flor.draw();
        });

        requestAnimationFrame(animar);
    }

    animar();
});