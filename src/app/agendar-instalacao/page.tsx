"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeft, CalendarCheck2, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5551993043810";

const serviceOptions = [
  "CFTV",
  "Portão eletrônico",
  "Alarme residencial",
  "Cerca elétrica",
  "Manutenção técnica",
  "Suporte e ajustes",
];

export default function AgendarInstalacaoPage() {
  const [fullName, setFullName] = useState("");
  const [selectedService, setSelectedService] = useState(() => {
    if (typeof window === "undefined") {
      return "CFTV";
    }

    const search = new URLSearchParams(window.location.search);
    const service = search.get("servico");

    if (service && serviceOptions.includes(service)) {
      return service;
    }

    return "CFTV";
  });

  const isValid =
    fullName.trim().length >= 3 && selectedService.trim().length > 0;

  const whatsappUrl = useMemo(() => {
    const message = [
      "Olá, equipe JJ Sistema de Segurança!",
      "Quero solicitar agendamento/orçamento.",
      `Nome completo: ${fullName.trim()}`,
      `Serviço selecionado: ${selectedService}`,
    ].join("\n");

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [fullName, selectedService]);

  return (
    <main className="min-h-screen bg-[#111111] px-6 py-12 text-[#F5F5F5] lg:px-8">
      <div className="mx-auto w-full max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#3A3A3A] bg-[#1A1A1A] px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-[#E8532A] hover:text-[#E8532A]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para a página inicial
        </Link>

        <section className="rounded-3xl border border-[#2A2A2A] bg-[#1A1A1A] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.35)] sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#E8532A]">
              Agendamento rápido
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Agendar atendimento com a JJ Sistema de Segurança
            </h1>
            <p className="mt-3 text-sm text-[#D1D1D1] sm:text-base">
              Preencha seus dados e confirme no WhatsApp para enviar tudo pronto
              para nossa equipe.
            </p>
          </div>

          <form
            className="space-y-5"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="space-y-2">
              <label
                htmlFor="fullName"
                className="text-sm font-semibold text-white"
              >
                Nome completo
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Digite seu nome completo"
                className="h-12 w-full rounded-xl border border-[#3A3A3A] bg-[#151515] px-4 text-sm text-white outline-none transition-colors placeholder:text-[#8E8E8E] focus:border-[#E8532A]"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="service"
                className="text-sm font-semibold text-white"
              >
                Selecione o serviço
              </label>
              <select
                id="service"
                value={selectedService}
                onChange={(event) => setSelectedService(event.target.value)}
                className="h-12 w-full rounded-xl border border-[#3A3A3A] bg-[#151515] px-4 text-sm text-white outline-none transition-colors focus:border-[#E8532A]"
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
                  ? "bg-[#E8532A] text-white shadow-[0_12px_25px_rgba(232,83,42,0.35)] hover:bg-[#CF4521]"
                  : "cursor-not-allowed bg-[#4A4A4A] text-[#B8B8B8]"
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
