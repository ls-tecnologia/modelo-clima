"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CalendarCheck2, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5581960002151";

const serviceOptions = [
  "Instalação",
  "Assistência Técnica",
  "Manutenção Corretiva",
  "Manutenção Preventiva",
  "Higienização",
  "Desinfecção",
  "PMOC",
  "Limpeza Técnica",
];

export default function AgendarInstalacaoPage() {
  const [fullName, setFullName] = useState("");
  const [selectedService, setSelectedService] = useState(() => {
    if (typeof window === "undefined") {
      return "Instalação";
    }

    const search = new URLSearchParams(window.location.search);
    const service = search.get("servico");

    if (service && serviceOptions.includes(service)) {
      return service;
    }

    return "Instalação";
  });

  const isValid = fullName.trim().length >= 3 && selectedService.trim().length > 0;

  const whatsappUrl = useMemo(() => {
    const message = [
      "Olá, equipe Empresa!",
      "Quero agendar um serviço.",
      `Nome completo: ${fullName.trim()}`,
      `Serviço selecionado: ${selectedService}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [fullName, selectedService]);

  return (
    <main className="min-h-screen bg-[#F5F5FF] px-6 py-12 text-[#1F2933] lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#CFCFF5] bg-white px-4 py-2 text-sm font-semibold text-[#0E0E75] transition-colors hover:bg-[#ECECFF]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a página inicial
        </Link>

        <section className="rounded-3xl border border-white/70 bg-white p-8 shadow-[0_30px_70px_rgba(14,14,117,0.16)] sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#0E0E75]">Agendamento rápido</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#111827] sm:text-4xl">
              Agendar serviço com a Empresa
            </h1>
            <p className="mt-3 text-sm text-[#4B5563] sm:text-base">
              Preencha seus dados e confirme no WhatsApp para enviar tudo pronto para nossa equipe.
            </p>
          </div>

          <form className="space-y-5" onSubmit={(event) => event.preventDefault()}>
            <div className="space-y-2">
              <label htmlFor="fullName" className="text-sm font-semibold text-[#111827]">
                Nome completo
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Digite seu nome completo"
                className="h-12 w-full rounded-xl border border-[#CFCFF5] bg-white px-4 text-sm text-[#111827] outline-none transition-colors focus:border-[#0E0E75]"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="service" className="text-sm font-semibold text-[#111827]">
                Selecione o serviço
              </label>
              <select
                id="service"
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#CFCFF5] bg-white px-4 text-sm text-[#111827] outline-none transition-colors focus:border-[#0E0E75]"
              >
                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <a
              href={isValid ? whatsappUrl : "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-disabled={!isValid}
              className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all ${
                isValid
                  ? "bg-[#0E0E75] text-white shadow-[0_12px_25px_rgba(14,14,117,0.35)] hover:bg-[#0A0A5A]"
                  : "cursor-not-allowed bg-[#CBD5E1] text-[#64748B]"
              }`}
            >
              <CalendarCheck2 className="h-4 w-4" />
              Confirmar no WhatsApp
              <MessageCircle className="h-4 w-4" />
            </a>
          </form>
        </section>
      </div>
    </main>
  );
}
