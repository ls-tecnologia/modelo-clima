"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Maximize2,
  MapPin,
  MessageCircle,
  Pause,
  Phone,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Volume2,
  VolumeX,
  Wind,
  Wrench,
} from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/5581960002151?text=Ol%C3%A1%2C%20quero%20um%20or%C3%A7amento%20para%20ar-condicionado.";
const PHONE_LINK = "tel:+5581960002151";
const EMAIL_LINK = "mailto:contato@empresa.com";
const INSTAGRAM_LINK = "https://instagram.com/lucassantos.atlas";
const MAPS_EMBED_LINK =
  "https://maps.google.com/maps?q=Rua%20Terezinha%20Geni%20Martin%20Tavares%2C%20256%2C%20Rio%20das%20Pedras%20SP&t=&z=15&ie=UTF8&iwloc=&output=embed";

const services = [
  {
    title: "Instalação",
    description: "Instalação técnica de ar-condicionado com acabamento profissional.",
    icon: Wrench,
  },
  {
    title: "Assistência Técnica",
    description: "Suporte rápido para diagnóstico e solução de falhas no equipamento.",
    icon: Phone,
  },
  {
    title: "Manutenção Corretiva",
    description: "Correção de problemas para restabelecer desempenho e conforto térmico.",
    icon: Wind,
  },
  {
    title: "Manutenção Preventiva",
    description: "Plano de prevenção para aumentar vida útil e reduzir paradas inesperadas.",
    icon: Clock3,
  },
  {
    title: "Higienização",
    description: "Limpeza técnica para melhorar qualidade do ar e eficiência do sistema.",
    icon: Sparkles,
  },
  {
    title: "Desinfecção",
    description: "Processo de desinfecção para ambientes mais saudáveis e seguros.",
    icon: ShieldCheck,
  },
  {
    title: "Fornecemos PMOC",
    description: "Elaboração e suporte ao PMOC conforme exigências técnicas e legais.",
    icon: CheckCircle2,
  },
  {
    title: "Limpeza Técnica",
    description: "Serviço de limpeza para manter desempenho e economia energética.",
    icon: Wrench,
  },
];

const benefits = [
  "Atendimento ágil",
  "Equipe técnica especializada e pontual",
  "Serviço completo: venda, instalação e manutenção",
  "Nota 5.0 com 120 avaliações de clientes reais",
];

const testimonials = [
  {
    name: "Denia Souza",
    text: "Trabalho excelente e muito organizado! Super recomendável!",
  },
  {
    name: "Gelberth Franklin",
    text: "Experiência excelente! Atendimento impecável desde o orçamento até a instalação. Qualidade excepcional.",
  },
  {
    name: "João Camargo Neto",
    text: "Instalação perfeita, serviço rápido, preço justo e tudo limpinho. Recomendo com certeza!",
  },
];

type VideoItem = {
  title: string;
  description: string;
  src: string;
  durationLabel: string;
};

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Fotos", href: "#galeria-fotos" },
  { label: "Vídeos", href: "#videos" },
  { label: "Contato", href: "#contato" },
];

const videoPlaceholders: VideoItem[] = [
  {
    title: "Instalação de ar-condicionado split em residência",
    description: "Adicione o arquivo de vídeo desta instalação para mostrar o processo completo.",
    src: "",
    durationLabel: "02:16",
  },
  {
    title: "Higienização e desinfecção profissional em empresa",
    description: "Ideal para apresentar o cuidado técnico, limpeza e segurança da equipe.",
    src: "",
    durationLabel: "01:48",
  },
  {
    title: "Manutenção preventiva para alto desempenho",
    description: "Mostre o antes e depois de desempenho e economia em um vídeo curto.",
    src: "",
    durationLabel: "02:04",
  },
];

const photoPlaceholders = [
  {
    title: "Instalação Residencial",
    description: "Equipe técnica durante instalação de split em ambiente interno.",
  },
  {
    title: "Manutenção Preventiva",
    description: "Checklist completo para manter desempenho e economia do equipamento.",
  },
  {
    title: "Higienização Profissional",
    description: "Limpeza técnica para melhor qualidade do ar e segurança da família.",
  },
  {
    title: "Projeto Comercial",
    description: "Climatização aplicada para conforto térmico em ambientes corporativos.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return "00:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

function PremiumVideoPlayer({ video }: { video: VideoItem }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const element = videoRef.current;
    if (!element) {
      return;
    }

    const handleTimeUpdate = () => setCurrentTime(element.currentTime);
    const handleMetadataLoaded = () => setDuration(element.duration || 0);
    const handleEnded = () => setIsPlaying(false);

    element.addEventListener("timeupdate", handleTimeUpdate);
    element.addEventListener("loadedmetadata", handleMetadataLoaded);
    element.addEventListener("ended", handleEnded);

    return () => {
      element.removeEventListener("timeupdate", handleTimeUpdate);
      element.removeEventListener("loadedmetadata", handleMetadataLoaded);
      element.removeEventListener("ended", handleEnded);
    };
  }, [video.src]);

  const togglePlay = async () => {
    const element = videoRef.current;
    if (!element || !video.src) {
      return;
    }

    if (element.paused) {
      await element.play();
      setIsPlaying(true);
      return;
    }

    element.pause();
    setIsPlaying(false);
  };

  const toggleMute = () => {
    const element = videoRef.current;
    if (!element || !video.src) {
      return;
    }

    const nextMutedState = !isMuted;
    element.muted = nextMutedState;
    setIsMuted(nextMutedState);
  };

  const handleSeek = (value: number) => {
    const element = videoRef.current;
    if (!element || !video.src) {
      return;
    }

    element.currentTime = value;
    setCurrentTime(value);
  };

  const openFullscreen = async () => {
    if (!containerRef.current) {
      return;
    }

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await containerRef.current.requestFullscreen();
  };

  return (
    <div className="rounded-2xl border border-[#CFCFF5] bg-gradient-to-b from-white via-white to-[#F2F2FF] p-4 shadow-[0_20px_45px_rgba(14,14,117,0.15)]">
      <div ref={containerRef} className="relative overflow-hidden rounded-xl border border-[#C7C7F3]">
        {video.src ? (
          <video
            ref={videoRef}
            src={video.src}
            preload="metadata"
            playsInline
            className="aspect-video w-full bg-[#041D2E] object-cover"
          />
        ) : (
          <div className="relative aspect-video w-full bg-[linear-gradient(135deg,rgba(14,14,117,0.95),rgba(14,14,117,0.88))]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.28),transparent_35%)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="rounded-full border border-white/40 bg-white/20 p-5 backdrop-blur">
                <PlayCircle className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(2,18,28,0.65),transparent_45%)]" />

        <div className="absolute right-3 bottom-3 rounded-full border border-white/35 bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {duration > 0 ? formatTime(duration) : video.durationLabel}
        </div>

        <button
          type="button"
          onClick={togglePlay}
          className="absolute left-3 bottom-3 inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/20 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur transition-transform hover:scale-[1.03]"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <PlayCircle className="h-4 w-4" />}
          {isPlaying ? "Pausar" : "Reproduzir"}
        </button>
      </div>

      <div className="mt-4">
        <p className="text-sm font-semibold text-[#0E0E75]">Vídeo de obra</p>
        <h3 className="mt-1 text-lg font-semibold text-[#111827]">{video.title}</h3>
        <p className="mt-2 text-sm text-[#4B5563]">{video.description}</p>
      </div>

      <div className="mt-4 space-y-3 rounded-xl border border-[#DDDDFA] bg-white p-3">
        <div className="flex items-center gap-3">
          <span className="w-10 text-xs font-medium text-[#4B5563]">{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={duration > 0 ? currentTime : 0}
            onChange={(event) => handleSeek(Number(event.target.value))}
            className="h-1 w-full cursor-pointer accent-[#0E0E75]"
          />
          <span className="w-10 text-right text-xs font-medium text-[#4B5563]">
            {duration > 0 ? formatTime(duration) : video.durationLabel}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex items-center gap-1 rounded-full border border-[#CFCFF5] px-3 py-1.5 text-xs font-semibold text-[#0E0E75] transition-colors hover:bg-[#E7E7FF]"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <PlayCircle className="h-3.5 w-3.5" />}
            {isPlaying ? "Pause" : "Play"}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="inline-flex items-center gap-1 rounded-full border border-[#CFCFF5] px-3 py-1.5 text-xs font-semibold text-[#0E0E75] transition-colors hover:bg-[#E7E7FF]"
          >
            {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            {isMuted ? "Sem som" : "Com som"}
          </button>

          <button
            type="button"
            onClick={openFullscreen}
            className="inline-flex items-center gap-1 rounded-full border border-[#CFCFF5] px-3 py-1.5 text-xs font-semibold text-[#0E0E75] transition-colors hover:bg-[#E7E7FF]"
          >
            <Maximize2 className="h-3.5 w-3.5" />
            Tela cheia
          </button>

          {!video.src ? (
            <span className="rounded-full bg-[#ECECFF] px-2.5 py-1 text-xs font-medium text-[#0E0E75]">
              Adicione o `src` do vídeo para ativar
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [videoIndex, setVideoIndex] = useState(0);
  const [photoTouchStartX, setPhotoTouchStartX] = useState<number | null>(null);
  const [videoTouchStartX, setVideoTouchStartX] = useState<number | null>(null);
  const [isPhotoAuto, setIsPhotoAuto] = useState(true);
  const [isVideoAuto, setIsVideoAuto] = useState(true);

  const nextPhoto = () => {
    setPhotoIndex((previous) => (previous + 1) % photoPlaceholders.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((previous) => (previous - 1 + photoPlaceholders.length) % photoPlaceholders.length);
  };

  const nextVideo = () => {
    setVideoIndex((previous) => (previous + 1) % videoPlaceholders.length);
  };

  const prevVideo = () => {
    setVideoIndex((previous) => (previous - 1 + videoPlaceholders.length) % videoPlaceholders.length);
  };

  useEffect(() => {
    if (!isPhotoAuto) {
      return;
    }

    const timer = setInterval(() => {
      setPhotoIndex((previous) => (previous + 1) % photoPlaceholders.length);
    }, 4200);

    return () => clearInterval(timer);
  }, [isPhotoAuto]);

  useEffect(() => {
    if (!isVideoAuto) {
      return;
    }

    const timer = setInterval(() => {
      setVideoIndex((previous) => (previous + 1) % videoPlaceholders.length);
    }, 5200);

    return () => clearInterval(timer);
  }, [isVideoAuto]);

  return (
    <div className="relative overflow-x-clip bg-[#F5F5FF] text-[#1F2933]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#0E0E75]/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 16, 0], x: [0, -18, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#0E0E75]/20 blur-3xl"
        />
      </div>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/50 bg-[#0E0E75] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(14,14,117,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(14,14,117,0.32)]"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <header className="sticky top-0 z-40 border-b border-[#D9D9FA] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 lg:px-8">
          <a href="#inicio" className="group">
            <p className="text-xl font-bold tracking-tight text-[#0E0E75]">Empresa</p>
            <p className="text-xs text-[#7D8184] transition-colors group-hover:text-[#0E0E75]">
              Agilidade e qualidade que você precisa
            </p>
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#475569] transition-colors hover:text-[#0E0E75]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PHONE_LINK}
              className="hidden items-center gap-2 rounded-full border border-[#CFCFF5] bg-white px-4 py-2.5 text-sm font-semibold text-[#0E0E75] transition-colors hover:bg-[#ECECFF] sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              Ligar
            </a>
            <a
              href="/agendar-instalacao"
              className="inline-flex items-center gap-2 rounded-full bg-[#0E0E75] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(14,14,117,0.35)] transition-colors hover:bg-[#0A0A5A]"
            >
              <MessageCircle className="h-4 w-4" />
              Agendar
            </a>
          </div>
        </div>
      </header>

      <main className="relative">
        <section id="inicio" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,14,117,0.18),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(14,14,117,0.20),_transparent_48%)]" />
          <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#D1D5DB] px-3 py-1 text-xs font-medium text-[#7D8184]">
                <Star className="h-3.5 w-3.5 text-[#0E0E75]" />
                5.0 ⭐ com 94 avaliações
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-[#111827] sm:text-5xl lg:text-6xl">
                Design de conforto térmico com execução técnica de alto padrão.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#4B5563] sm:text-lg">
                Da escolha do equipamento à manutenção preventiva: a Empresa entrega serviço técnico
                completo, com rapidez no atendimento e padrão de qualidade que gera confiança desde o
                primeiro contato.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href="/agendar-instalacao?servico=Instala%C3%A7%C3%A3o"
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#0E0E75] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(14,14,117,0.35)] transition-colors duration-300 hover:bg-[#0A0A5A]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Agendar Instalação
                </motion.a>
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D1D5DB] px-6 py-3 text-sm font-semibold text-[#1F2933] transition-colors duration-300 hover:border-[#0E0E75] hover:text-[#0E0E75]"
                >
                  <Phone className="h-4 w-4" />
                  Falar com Técnico
                </a>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="hidden lg:block"
            >
              <div className="rounded-3xl border border-white/60 bg-gradient-to-br from-white via-[#F2F2FF] to-[#ECECFF] p-6 shadow-[0_30px_70px_rgba(14,14,117,0.16)]">
                <div className="aspect-[4/3] rounded-2xl bg-[linear-gradient(145deg,_rgba(14,14,117,0.14),_rgba(14,14,117,0.18))] p-6">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-white/70 bg-white/70 p-6 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7D8184]">
                      Placeholder de imagem
                    </p>
                    <div>
                      <p className="text-lg font-semibold text-[#111827]">Técnico instalando ar-condicionado split</p>
                      <p className="mt-2 text-sm text-[#4B5563]">
                        Ambiente limpo, equipe uniformizada e execução profissional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-[#D9D9FA] bg-white/75 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-6 w-6 text-[#0E0E75]" />
              <p className="text-sm font-medium text-[#1F2933]">Parceria oficial com @rotoplastoficial</p>
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="h-6 w-6 text-[#0E0E75]" />
              <p className="text-sm font-medium text-[#1F2933]">Segunda a Sábado, 07:00 - 19:00</p>
            </div>
          </div>
        </section>

        <section id="servicos" className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="text-sm font-semibold text-[#0E0E75]">Serviços</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              Soluções completas para climatização residencial e comercial
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-6 transition-shadow duration-300 hover:shadow-md"
                >
                  <Icon className="h-6 w-6 text-[#0E0E75]" />
                  <h3 className="mt-4 text-xl font-semibold text-[#111827]">{service.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B5563]">{service.description}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden bg-white/60">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(14,14,117,0.15),_transparent_35%),radial-gradient(circle_at_80%_70%,_rgba(14,14,117,0.18),_transparent_35%)]" />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="mb-10 rounded-3xl border border-white/60 bg-gradient-to-br from-white via-[#F2F2FF] to-[#ECECFF] p-5 shadow-[0_22px_55px_rgba(14,14,117,0.14)]">
                <div className="aspect-[16/9] rounded-2xl bg-[linear-gradient(145deg,_rgba(14,14,117,0.14),_rgba(14,14,117,0.18))] p-4">
                  <div className="flex h-full flex-col justify-between rounded-xl border border-white/70 bg-white/70 p-5 backdrop-blur">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7D8184]">
                      Placeholder de imagem
                    </p>
                    <div>
                      <p className="text-base font-semibold text-[#111827]">Equipe Empresa em atendimento local</p>
                      <p className="mt-1 text-sm text-[#4B5563]">
                        Sugestão: foto real da equipe/viatura para reforçar confiança local.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm font-semibold text-[#0E0E75]">Por que escolher a Empresa</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
                Confiança técnica com atendimento local de verdade
              </h2>
              <ul className="mt-8 space-y-4">
                {benefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#374151] sm:text-base">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0E0E75]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="rounded-3xl border border-[#E5E7EB] bg-white p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7D8184]">Atendimento rápido</p>
              <p className="mt-4 text-2xl font-semibold text-[#111827] sm:text-3xl">
                Precisa resolver hoje? Fale agora com a nossa equipe.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#4B5563] sm:text-base">
                Orçamento, instalação, limpeza e manutenção com suporte técnico próximo de você.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#0E0E75] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Solicitar Orçamento no WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-[#0E0E75]">Vídeos</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
                Resultados reais em campo
              </h2>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={prevVideo}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CFCFF5] bg-white text-[#0E0E75] transition-colors hover:bg-[#E7E7FF]"
                aria-label="Vídeo anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextVideo}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CFCFF5] bg-white text-[#0E0E75] transition-colors hover:bg-[#E7E7FF]"
                aria-label="Próximo vídeo"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
          <p className="mb-6 max-w-xl text-sm text-[#4B5563]">
            Espaço pronto para você inserir vídeos de instalações, manutenções e higienizações.
          </p>
          <div
            className="overflow-hidden rounded-3xl border border-[#CFCFF5] bg-white/90 p-3 shadow-[0_20px_45px_rgba(14,14,117,0.15)]"
            onMouseEnter={() => setIsVideoAuto(false)}
            onMouseLeave={() => setIsVideoAuto(true)}
            onTouchStart={(event) => setVideoTouchStartX(event.touches[0].clientX)}
            onTouchEnd={(event) => {
              if (videoTouchStartX === null) {
                return;
              }

              const swipeDistance = event.changedTouches[0].clientX - videoTouchStartX;

              if (swipeDistance < -50) {
                nextVideo();
              }

              if (swipeDistance > 50) {
                prevVideo();
              }

              setVideoTouchStartX(null);
            }}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${videoIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
            >
              {videoPlaceholders.map((video) => (
                <div key={video.title} className="w-full shrink-0">
                  <PremiumVideoPlayer video={video} />
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {videoPlaceholders.map((video, index) => (
              <button
                key={video.title}
                type="button"
                onClick={() => setVideoIndex(index)}
                aria-label={`Ir para vídeo ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  videoIndex === index ? "w-8 bg-[#0E0E75]" : "w-2.5 bg-[#B8B8EC]"
                }`}
              />
            ))}
          </div>
        </section>

        <section id="galeria-fotos" className="mx-auto w-full max-w-6xl px-6 pt-2 pb-20 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-[#0E0E75]">Galeria de fotos</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
                Serviços reais em imagens
              </h2>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={prevPhoto}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CFCFF5] bg-white text-[#0E0E75] transition-colors hover:bg-[#E7E7FF]"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#CFCFF5] bg-white text-[#0E0E75] transition-colors hover:bg-[#E7E7FF]"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          <div
            className="overflow-hidden rounded-3xl border border-[#CFCFF5] bg-white/90 p-3 shadow-[0_20px_45px_rgba(14,14,117,0.15)]"
            onMouseEnter={() => setIsPhotoAuto(false)}
            onMouseLeave={() => setIsPhotoAuto(true)}
            onTouchStart={(event) => setPhotoTouchStartX(event.touches[0].clientX)}
            onTouchEnd={(event) => {
              if (photoTouchStartX === null) {
                return;
              }

              const swipeDistance = event.changedTouches[0].clientX - photoTouchStartX;

              if (swipeDistance < -50) {
                nextPhoto();
              }

              if (swipeDistance > 50) {
                prevPhoto();
              }

              setPhotoTouchStartX(null);
            }}
          >
            <motion.div
              className="flex"
              animate={{ x: `-${photoIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20, mass: 0.8 }}
            >
              {photoPlaceholders.map((photo) => (
                <div key={photo.title} className="w-full shrink-0">
                  <article className="group grid gap-0 overflow-hidden rounded-2xl border border-[#DDDDFA] bg-white md:grid-cols-2">
                    <div className="relative min-h-[260px] bg-[linear-gradient(135deg,rgba(14,14,117,0.95),rgba(14,14,117,0.88))]">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_35%)]" />
                      <div className="absolute right-6 bottom-6 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                        Placeholder
                      </div>
                    </div>
                    <div className="flex min-h-[260px] flex-col justify-center p-8">
                      <p className="text-sm font-semibold text-[#0E0E75]">Empresa em campo</p>
                      <h3 className="mt-2 text-2xl font-semibold text-[#111827]">{photo.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#4B5563] sm:text-base">{photo.description}</p>
                    </div>
                  </article>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {photoPlaceholders.map((photo, index) => (
              <button
                key={photo.title}
                type="button"
                onClick={() => setPhotoIndex(index)}
                aria-label={`Ir para foto ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  photoIndex === index ? "w-8 bg-[#0E0E75]" : "w-2.5 bg-[#B8B8EC]"
                }`}
              />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pt-6 pb-20 lg:px-8">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10"
          >
            <p className="text-sm font-semibold text-[#0E0E75]">Avaliações em destaque</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              Nota máxima com clientes que voltam e indicam
            </h2>
          </motion.div>
          <div className="space-y-5">
            {testimonials.map((item, index) => (
              <motion.article
                key={item.name}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`rounded-2xl border border-white/40 bg-gradient-to-r from-[#0E0E75] to-[#0A0A5A] p-6 text-white shadow-[0_20px_45px_rgba(14,14,117,0.35)] ${
                  index === 1 ? "sm:ml-8" : index === 2 ? "sm:ml-16" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                  <span>{item.name}</span>
                  <span className="text-[#ECECFF]">— ★★★★★</span>
                </div>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#ECECFF]">“{item.text}”</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contato" className="bg-white/60">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-3xl border border-white/70 bg-white/95 p-8 shadow-[0_35px_80px_rgba(14,14,117,0.18)] sm:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-[#0E0E75]">Área de atendimento</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
                    Empresa em Região
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#4B5563] sm:text-base">
                    Atendimento local com presença estabelecida para oferecer mais agilidade e suporte próximo em cada serviço.
                  </p>
                  <div className="mt-6 flex items-start gap-3 text-sm text-[#374151] sm:text-base">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#0E0E75]" />
                    Endereço da empresa
                  </div>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-[#CFCFF5]">
                    <iframe
                      title="Localização Empresa"
                      src={MAPS_EMBED_LINK}
                      width="100%"
                      height="320"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="block"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] p-6">
                  <p className="text-sm font-semibold text-[#111827]">Vamos conversar agora?</p>
                  <div className="mt-5 space-y-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0E0E75] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#0A0A5A]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chamar no WhatsApp
                    </a>
                    <a
                      href={PHONE_LINK}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D1D5DB] px-5 py-3 text-sm font-semibold text-[#1F2933] transition-colors duration-300 hover:border-[#0E0E75] hover:text-[#0E0E75]"
                    >
                      <Phone className="h-4 w-4" />
                      Ligar Agora
                    </a>
                    <a
                      href={INSTAGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#D1D5DB] px-5 py-3 text-sm font-semibold text-[#1F2933] transition-colors duration-300 hover:border-[#0E0E75] hover:text-[#0E0E75]"
                    >
                      Ver Instagram
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[#E0E0FA] bg-gradient-to-b from-white to-[#ECECFF]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#D9D9FA] bg-white/80 px-5 py-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#0E0E75]">
              <Star className="h-4 w-4 fill-[#0E0E75] text-[#0E0E75]" />
              5.0 com 94 avaliações reais
            </div>
            <p className="text-sm font-medium text-[#4B5563]">Empresa local • Atendimento rápido</p>
          </div>

          <div className="grid gap-8 text-sm text-[#4B5563] sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-base font-semibold text-[#111827]">Empresa</p>
              <p className="mt-2">Climatização técnica completa com padrão profissional e suporte próximo.</p>
            </div>
            <div>
              <p className="font-semibold text-[#111827]">Contato direto</p>
              <div className="mt-3 space-y-2">
                <a href={PHONE_LINK} className="block transition-colors hover:text-[#0E0E75]">
                  (81) 96000-2151
                </a>
                <a href={EMAIL_LINK} className="block transition-colors hover:text-[#0E0E75]">
                  contato@empresa.com
                </a>
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-[#0E0E75]"
                >
                  @empresa
                </a>
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#111827]">Navegação rápida</p>
              <div className="mt-3 space-y-2">
                {navLinks.map((link) => (
                  <a key={link.href} href={link.href} className="block transition-colors hover:text-[#0E0E75]">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-[#111827]">Funcionamento</p>
              <p className="mt-3">Segunda a Sábado</p>
              <p>07:00 - 19:00</p>
              <p className="mt-3 text-xs leading-relaxed">
                Endereço da empresa
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-[#E6E6FB] pt-6 text-xs text-[#6B7280]">
            © {new Date().getFullYear()} Empresa Climatização. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
