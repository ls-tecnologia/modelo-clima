"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate, motion, useMotionValue } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Star,
  Wrench,
  Siren,
  Lock,
  Building2,
  Clock3,
} from "lucide-react";

const WHATSAPP_LINK =
  "https://wa.me/5551993043810?text=Olá!%20Quero%20um%20orçamento%20de%20instalação%20ou%20manutenção%20de%20segurança.";
const PHONE_LINK = "tel:+5551993043810";
const EMAIL_LINK = "mailto:contato@jjsistemasdeseguranca.com";
const INSTAGRAM_LINK = "https://instagram.com/jj.instalacoes_";
const MAPS_EMBED_LINK =
  "https://www.google.com/maps?q=Tramandaí,+Rio+Grande+do+Sul&output=embed";

const services = [
  {
    title: "CFTV",
    description:
      "Instalação e manutenção de câmeras com posicionamento estratégico para cobertura real do ambiente.",
    icon: ShieldCheck,
  },
  {
    title: "Portão Eletrônico",
    description:
      "Automação, ajustes e reparos para acesso seguro e funcionamento confiável no dia a dia.",
    icon: Lock,
  },
  {
    title: "Alarme Residencial",
    description:
      "Soluções de alarme para proteção ativa da sua casa, com instalação técnica e orientação completa.",
    icon: Siren,
  },
  {
    title: "Cerca Elétrica",
    description:
      "Instalação e manutenção com padrão técnico para reforço de perímetro em residências e comércios.",
    icon: Wrench,
  },
];

const benefits = [
  "Atendimento técnico especializado em instalação e manutenção",
  "Foco em segurança residencial e comercial",
  "Execução limpa, organizada e com orientação clara ao cliente",
  "Contato rápido e direto via WhatsApp",
];

const testimonials = [
  {
    name: "Cliente residencial",
    text: "Equipe pontual, instalação bem feita e atendimento muito profissional do início ao fim.",
  },
  {
    name: "Cliente comercial",
    text: "Resolveram toda a parte de segurança da loja com agilidade e explicação técnica clara.",
  },
  {
    name: "Cliente recorrente",
    text: "Já fiz manutenção e nova instalação com eles. Sempre confiáveis e diretos no atendimento.",
  },
];

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Fotos", href: "#galeria-fotos" },
  { label: "Contato", href: "#contato" },
];

const photoPlaceholders = [
  {
    title: "Instalação de CFTV",
    description:
      "Equipe em campo realizando instalação técnica de câmeras em ponto estratégico.",
    image: "/images/camera-bullet-muro-externo.jpeg",
  },
  {
    title: "Cerca Elétrica",
    description:
      "Reforço de perímetro com instalação técnica e acabamento organizado.",
    image: "/images/camera-intelbras-cerca-eletrica.jpeg",
  },
  {
    title: "Monitoramento Interno",
    description:
      "Sistema de câmeras com sensor de presença para proteção de ambientes internos com discrição e eficiência.",
    image: "/images/camera-sensor-presenca-interno.jpeg",
  },
  {
    title: "Projeto Comercial",
    description:
      "Solução de segurança para operação comercial com foco em cobertura e confiabilidade.",
    image: "/images/camera-vigilancia-ezviz.jpeg",
  },
  {
    title: "Vigilância Externa Avançada",
    description:
      "Câmeras WiFi com qualidade de vídeo superior e cobertura de área ampla para residências e estabelecimentos.",
    image: "/images/camera-wifi-intelbras-externa.jpeg",
  },
  {
    title: "Sistema de Alarme",
    description:
      "Central de alarme inteligente com controle remoto e integração com câmeras para proteção 24/7.",
    image: "/images/central-alarme-intelbras.jpeg",
  },
  {
    title: "Central de Alarme Profissional",
    description:
      "Instalação de central JFL com bateria de backup, garantindo funcionamento contínuo mesmo em caso de queda de energia.",
    image: "/images/central-alarme-jfl.jpeg",
  },
  {
    title: "Controle de Acesso",
    description:
      "Sistema de fechadura digital inteligente com teclado numérico para segurança de ambientes com maior controle de entrada.",
    image: "/images/controle-acesso-fechadura-digital.jpeg",
  },
  {
    title: "Kit Duplo de Câmeras",
    description:
      "Conjunto de duas câmeras bullet externas para cobertura ampla e redundância de segurança em áreas críticas.",
    image: "/images/kit-duplo-cameras-externas.jpeg",
  },
  {
    title: "Sensor de Barreira Ativa",
    description:
      "Sistema de sensor infravermelho para detecção de movimento em entradas e perímetros, com alerta imediato.",
    image: "/images/sensor-barreira-ativa-entrada.jpeg",
  },
  {
    title: "Teclado de Alarme Intelbras",
    description:
      "Painel de controle LCD inteligente com interface intuitiva para gerenciamento de zonas e armamento do sistema de alarme.",
    image: "/images/teclado-alarme-intelbras-lcd.jpeg",
  },
  {
    title: "Vigilância Perimetral Externa",
    description:
      "Sistema de câmeras posicionado estrategicamente para monitoramento contínuo de toda a área externa e perímetro da propriedade.",
    image: "/images/vigilancia-perimetral-externa.jpeg",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photoIndexRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchStartTime = useRef<number | null>(null);
  const isHorizontalSwipe = useRef<boolean | null>(null);
  const x = useMotionValue(0);

  const getWidth = () => containerRef.current?.offsetWidth ?? 0;

  const goTo = (index: number) => {
    const next =
      ((index % photoPlaceholders.length) + photoPlaceholders.length) %
      photoPlaceholders.length;
    photoIndexRef.current = next;
    setPhotoIndex(next);
    animate(x, -next * getWidth(), {
      type: "spring",
      stiffness: 400,
      damping: 40,
      mass: 0.8,
    });
  };

  const nextPhoto = () => goTo(photoIndexRef.current + 1);
  const prevPhoto = () => goTo(photoIndexRef.current - 1);

  useEffect(() => {
    const handleResize = () => {
      x.jump(-photoIndexRef.current * getWidth());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [x]);

  return (
    <div className="relative overflow-x-clip bg-[#111111] text-[#F5F5F5]">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 18, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[#E8532A]/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 16, 0], x: [0, -18, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-[#E8532A]/20 blur-3xl"
        />
      </div>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-5 bottom-5 z-50 inline-flex items-center gap-2 rounded-full border border-white/30 bg-[#E8532A] px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(232,83,42,0.35)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(232,83,42,0.45)]"
      >
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </a>

      <header className="sticky top-0 z-40 border-b border-[#2A2A2A] bg-[#111111]/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-3 lg:px-8">
          <a href="#inicio" className="group flex items-center gap-3">
            <div className="h-10 w-10 relative flex-shrink-0">
              <Image
                src="/images/logo.png"
                alt="Logo JJ Sistema de Segurança"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <p className="text-xl font-bold tracking-tight text-white">
                JJ Sistema de Segurança
              </p>
              <p className="text-xs text-[#B8B8B8] transition-colors group-hover:text-[#E8532A]">
                Instalação e manutenção técnica
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#CFCFCF] transition-colors hover:text-[#E8532A]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={PHONE_LINK}
              className="hidden items-center gap-2 rounded-full border border-[#3A3A3A] bg-[#1E1E1E] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:border-[#E8532A] sm:inline-flex"
            >
              <Phone className="h-4 w-4" />
              Ligar
            </a>
            <a
              href="/agendar-instalacao"
              className="inline-flex items-center gap-2 rounded-full bg-[#E8532A] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(232,83,42,0.35)] transition-colors hover:bg-[#CF4521]"
            >
              <MessageCircle className="h-4 w-4" />
              Agendar
            </a>
          </div>
        </div>
      </header>

      <main className="relative">
        <section id="inicio" className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(232,83,42,0.18),_transparent_45%),radial-gradient(circle_at_bottom_left,_rgba(232,83,42,0.2),_transparent_48%)]" />
          <div className="relative mx-auto w-full max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3A3A3A] px-3 py-1 text-xs font-medium text-[#B8B8B8]">
                <Star className="h-3.5 w-3.5 text-[#E8532A]" />
                Segurança residencial e comercial
              </p>
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Proteção técnica para o seu patrimônio, com execução
                profissional.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[#D1D1D1] sm:text-lg">
                A JJ Sistema de Segurança atua com instalação e manutenção de
                CFTV, portão eletrônico, alarme residencial e cerca elétrica.
                Atendimento direto, confiável e focado em resultado.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href="/agendar-instalacao?servico=CFTV"
                  whileHover={{ y: -3, scale: 1.01 }}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8532A] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(232,83,42,0.35)] transition-colors duration-300 hover:bg-[#CF4521]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Solicitar Orçamento
                </motion.a>
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-[#3A3A3A] px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#E8532A] hover:text-[#E8532A]"
                >
                  <Phone className="h-4 w-4" />
                  Falar com Técnico
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-[#2A2A2A] bg-[#151515]/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div className="flex items-center gap-3">
              <Building2 className="h-6 w-6 text-[#E8532A]" />
              <p className="text-sm font-medium text-[#F0F0F0]">
                Atendimento residencial e comercial
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Clock3 className="h-6 w-6 text-[#E8532A]" />
              <p className="text-sm font-medium text-[#F0F0F0]">
                Contato rápido e direto pelo WhatsApp
              </p>
            </div>
          </div>
        </section>

        <section
          id="servicos"
          className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-12"
          >
            <p className="text-sm font-semibold text-[#E8532A]">Serviços</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Instalação e manutenção para segurança do seu imóvel
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
                  transition={{
                    duration: 0.45,
                    delay: index * 0.08,
                    ease: "easeOut",
                  }}
                  className="rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                >
                  <Icon className="h-6 w-6 text-[#E8532A]" />
                  <h3 className="mt-4 text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#D1D1D1]">
                    {service.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#141414]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(232,83,42,0.14),_transparent_35%),radial-gradient(circle_at_80%_70%,_rgba(232,83,42,0.16),_transparent_35%)]" />
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="mb-10 rounded-3xl border border-[#2A2A2A] bg-gradient-to-br from-[#1A1A1A] via-[#1E1E1E] to-[#1A1A1A] p-5 shadow-[0_22px_55px_rgba(0,0,0,0.35)]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <Image
                    src="/images/secao-sobre-jhon.jpeg"
                    alt="Equipe JJ em atendimento técnico"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              <p className="text-sm font-semibold text-[#E8532A]">
                Por que escolher a JJ
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Atendimento técnico, direto e com foco em segurança real
              </h2>
              <ul className="mt-8 space-y-4">
                {benefits.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[#E5E5E5] sm:text-base"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E8532A]" />
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
              className="rounded-3xl border border-[#2A2A2A] bg-[#1A1A1A] p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B8B8B8]">
                Atendimento imediato
              </p>
              <p className="mt-4 text-2xl font-semibold text-white sm:text-3xl">
                Quer reforçar sua segurança hoje? Fale agora com a equipe JJ.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#D1D1D1] sm:text-base">
                Receba orientação técnica, orçamento rápido e solução sob medida
                para sua necessidade.
              </p>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#E8532A] px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Solicitar Orçamento no WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        <section
          id="galeria-fotos"
          className="mx-auto w-full max-w-6xl px-6 pt-2 pb-20 lg:px-8"
        >
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-10 flex items-end justify-between gap-6"
          >
            <div>
              <p className="text-sm font-semibold text-[#E8532A]">
                Galeria de fotos
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Instalações e manutenções em campo
              </h2>
            </div>
            <div className="hidden items-center gap-2 md:flex">
              <button
                type="button"
                onClick={prevPhoto}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#3A3A3A] bg-[#1A1A1A] text-[#E8532A] transition-colors hover:bg-[#252525]"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#3A3A3A] bg-[#1A1A1A] text-[#E8532A] transition-colors hover:bg-[#252525]"
                aria-label="Próxima foto"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          <div
            ref={containerRef}
            className="overflow-hidden rounded-3xl border border-[#2A2A2A] bg-[#111111] p-3 shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
            style={{ touchAction: "pan-y" }}
            onTouchStart={(event) => {
              touchStartX.current = event.touches[0].clientX;
              touchStartY.current = event.touches[0].clientY;
              touchStartTime.current = Date.now();
              isHorizontalSwipe.current = null;
            }}
            onTouchMove={(event) => {
              if (touchStartX.current === null || touchStartY.current === null)
                return;

              const deltaX = event.touches[0].clientX - touchStartX.current;
              const deltaY = event.touches[0].clientY - touchStartY.current;

              if (
                isHorizontalSwipe.current === null &&
                Math.max(Math.abs(deltaX), Math.abs(deltaY)) > 5
              ) {
                isHorizontalSwipe.current = Math.abs(deltaX) > Math.abs(deltaY);
              }

              if (isHorizontalSwipe.current) {
                x.set(-photoIndexRef.current * getWidth() + deltaX);
              }
            }}
            onTouchEnd={(event) => {
              if (
                !isHorizontalSwipe.current ||
                touchStartX.current === null ||
                touchStartTime.current === null
              ) {
                touchStartX.current = null;
                touchStartY.current = null;
                isHorizontalSwipe.current = null;
                return;
              }

              const deltaX =
                event.changedTouches[0].clientX - touchStartX.current;
              const elapsed = Date.now() - touchStartTime.current;
              const velocity = Math.abs(deltaX) / elapsed;
              const width = getWidth();

              if (deltaX < -(width * 0.2) || (velocity > 0.4 && deltaX < 0)) {
                goTo(photoIndexRef.current + 1);
              } else if (
                deltaX > width * 0.2 ||
                (velocity > 0.4 && deltaX > 0)
              ) {
                goTo(photoIndexRef.current - 1);
              } else {
                animate(x, -photoIndexRef.current * width, {
                  type: "spring",
                  stiffness: 400,
                  damping: 40,
                  mass: 0.8,
                });
              }

              touchStartX.current = null;
              touchStartY.current = null;
              isHorizontalSwipe.current = null;
            }}
          >
            <motion.div className="flex" style={{ x }}>
              {photoPlaceholders.map((photo) => (
                <div key={photo.title} className="w-full shrink-0">
                  <article className="group grid gap-0 overflow-hidden rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] md:grid-cols-2">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <div className="absolute inset-0 bg-[#111111] z-0" />
                      {photo.image ? (
                        <Image
                          src={photo.image}
                          alt={photo.title}
                          fill
                          className="object-cover relative z-10"
                        />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent_35%)] z-10" />
                          <div className="absolute right-6 bottom-6 z-20 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white backdrop-blur">
                            Placeholder
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex min-h-[260px] flex-col justify-center p-8">
                      <p className="text-sm font-semibold text-[#E8532A]">
                        JJ em campo
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        {photo.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#D1D1D1] sm:text-base">
                        {photo.description}
                      </p>
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
                onClick={() => goTo(index)}
                aria-label={`Ir para foto ${index + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  photoIndex === index
                    ? "w-8 bg-[#E8532A]"
                    : "w-2.5 bg-[#5A5A5A]"
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
            <p className="text-sm font-semibold text-[#E8532A]">
              Avaliações em destaque
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Confiança construída em cada atendimento
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
                transition={{
                  duration: 0.45,
                  delay: index * 0.08,
                  ease: "easeOut",
                }}
                whileHover={{ y: -4, scale: 1.01 }}
                className={`rounded-2xl border border-[#2A2A2A] bg-gradient-to-r from-[#1A1A1A] to-[#111111] p-6 text-white shadow-[0_20px_45px_rgba(0,0,0,0.35)] ${
                  index === 1 ? "sm:ml-8" : index === 2 ? "sm:ml-16" : ""
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                  <span>{item.name}</span>
                  <span className="text-[#E8532A]">— ★★★★★</span>
                </div>
                <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#E5E5E5]">
                  “{item.text}”
                </p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="contato" className="bg-[#141414]">
          <div className="mx-auto w-full max-w-6xl px-6 py-20 lg:px-8">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-3xl border border-[#2A2A2A] bg-[#1A1A1A] p-8 shadow-[0_35px_80px_rgba(0,0,0,0.35)] sm:p-10"
            >
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="text-sm font-semibold text-[#E8532A]">
                    Área de atendimento
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                    JJ Sistema de Segurança
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-[#D1D1D1] sm:text-base">
                    Atendimento com foco em instalação e manutenção técnica para
                    residências e comércios.
                  </p>
                  <div className="mt-6 flex items-start gap-3 text-sm text-[#E5E5E5] sm:text-base">
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#E8532A]" />
                    Atendimento sob consulta na sua região
                  </div>

                  <div className="mt-6 overflow-hidden rounded-2xl border border-[#2A2A2A]">
                    <iframe
                      title="Localização JJ Sistema de Segurança"
                      src={MAPS_EMBED_LINK}
                      width="100%"
                      height="320"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="block"
                    />
                  </div>
                </div>

                <div className="rounded-2xl border border-[#2A2A2A] bg-[#151515] p-6">
                  <p className="text-sm font-semibold text-white">
                    Vamos conversar agora?
                  </p>
                  <div className="mt-5 space-y-3">
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#E8532A] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#CF4521]"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Chamar no WhatsApp
                    </a>
                    <a
                      href={PHONE_LINK}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#3A3A3A] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#E8532A] hover:text-[#E8532A]"
                    >
                      <Phone className="h-4 w-4" />
                      Ligar Agora
                    </a>
                    <a
                      href={INSTAGRAM_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#3A3A3A] px-5 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:border-[#E8532A] hover:text-[#E8532A]"
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

      <footer className="border-t border-[#2A2A2A] bg-gradient-to-b from-[#141414] to-[#111111]">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#2A2A2A] bg-[#1A1A1A] px-5 py-4 backdrop-blur">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <Star className="h-4 w-4 fill-[#E8532A] text-[#E8532A]" />
              Atendimento técnico especializado
            </div>
            <p className="text-sm font-medium text-[#D1D1D1]">
              JJ Sistema de Segurança • Contato rápido
            </p>
          </div>

          <div className="grid gap-8 text-sm text-[#D1D1D1] sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-base font-semibold text-white">
                JJ Sistema de Segurança
              </p>
              <p className="mt-2">
                Soluções em instalação e manutenção de sistemas de segurança
                residencial e comercial.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white">Contato direto</p>
              <div className="mt-3 space-y-2">
                <a
                  href={PHONE_LINK}
                  className="block transition-colors hover:text-[#E8532A]"
                >
                  +55 51 99304-3810
                </a>
                <a
                  href={EMAIL_LINK}
                  className="block transition-colors hover:text-[#E8532A]"
                >
                  contato@jjsistemasdeseguranca.com
                </a>
                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block transition-colors hover:text-[#E8532A]"
                >
                  @jj.instalacoes_
                </a>
              </div>
            </div>
            <div>
              <p className="font-semibold text-white">Navegação rápida</p>
              <div className="mt-3 space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block transition-colors hover:text-[#E8532A]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-white">Atuação</p>
              <p className="mt-3">Residencial e comercial</p>
              <p>Instalação e manutenção técnica</p>
              <p className="mt-3 text-xs leading-relaxed">
                Não trabalhamos com venda de equipamentos.
              </p>
            </div>
          </div>

          <div className="mt-10 border-t border-[#2A2A2A] pt-6 text-xs text-[#9A9A9A]">
            © {new Date().getFullYear()} JJ Sistema de Segurança. Todos os
            direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
