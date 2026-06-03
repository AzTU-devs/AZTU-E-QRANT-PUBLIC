"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  Target,
  Users,
  Star,
  Wallet,
  Clock,
  ListChecks,
  HelpCircle,
  FileSignature,
  ArrowRight,
  Mail,
  Phone,
  FolderKanban,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 12, stiffness: 100 },
  },
};

export default function HomeContent() {
  const text = "Azərbaycan Texniki Universiteti (AzTU) daxili qrant müsabiqəsi elan edir";
  const letters = text.split("");

  const titleContainer: Variants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.02 * i },
    }),
  };

  const letterVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 10, stiffness: 150 },
    },
  };

  return (
    <div className="w-full bg-gray-50/50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand py-20 px-4 sm:px-8 md:px-16 lg:px-20 text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-600 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.h1
            variants={titleContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center text-3xl md:text-5xl font-bold mb-8 tracking-tight"
          >
            {letters.map((char, index) => (
              <motion.span key={index} variants={letterVariants} aria-hidden={char === " "}>
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="text-lg md:text-xl text-blue-100 max-w-3xl mb-10 leading-relaxed"
          >
            Azərbaycan Texniki Universiteti (AzTU) elmi-tədqiqat işlərinin və
            innovasiyaların dəstəklənməsi və inkişafı məqsədilə daxili qrant müsabiqəsi
            elan edir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href={siteConfig.portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-blue-50 hover:scale-105 shadow-xl"
            >
              İndi müraciət et <ArrowRight size={22} />
            </a>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:bg-white/20"
            >
              <FolderKanban size={22} /> Layihələrə bax
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Info grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto px-4 sm:px-8 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {/* Purpose */}
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 text-brand rounded-xl flex items-center justify-center mb-6">
            <Target />
          </div>
          <h2 className="text-xl font-bold text-brand mb-4">Müsabiqənin məqsədi</h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex gap-2"><span className="text-blue-500">•</span>AzTU və tərəfdaş institutların sənaye və praktik əhəmiyyətli işlərinə dəstək vermək</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span>Elmi-tədqiqat ekosistemini gücləndirmək və innovativ ideyaları reallaşdırmaq</li>
            <li className="flex gap-2"><span className="text-blue-500">•</span>Tədqiqatçıların motivasiyasını və elmi potensialını yüksəltmək</li>
          </ul>
        </motion.div>

        {/* Eligibility */}
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-indigo-100 text-indigo-700 rounded-xl flex items-center justify-center mb-6">
            <Users />
          </div>
          <h2 className="text-xl font-bold text-brand mb-4">Kimlər iştirak edə bilər?</h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex gap-2"><span className="text-indigo-500">•</span>AzTU-nun professor-müəllim heyəti, doktorantları və magistrləri</li>
            <li className="flex gap-2"><span className="text-indigo-500">•</span>İnformasiya Texnologiyaları və İdarəetmə Sistemləri İnstitutunun əməkdaşları</li>
          </ul>
        </motion.div>

        {/* Priorities */}
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center mb-6">
            <Star />
          </div>
          <h2 className="text-xl font-bold text-brand mb-4">Prioritet istiqamətlər</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>1. Rəqəmsal texnologiyalar</li>
            <li>2. Müdafiə sənayesi işləmələri</li>
            <li>3. Yeni materiallar</li>
            <li>4. Yaşıl enerji və ətraf mühit</li>
            <li>5. Yeni qurğu və cihaz layihələndirmələri</li>
          </ul>
        </motion.div>

        {/* Budget */}
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 md:col-span-2 lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-green-100 text-green-700 rounded-xl flex items-center justify-center mb-6">
              <Wallet />
            </div>
            <h2 className="text-xl font-bold text-brand mb-4">Maliyyə və Müddət</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Büdcə</span>
                <span className="text-gray-700 font-medium">Maks. 30,000 AZN / layihə</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">Müddət</span>
                <span className="text-gray-700 font-medium">6 - 12 ay</span>
              </div>
            </div>
          </div>
          <p className="mt-6 text-xs text-gray-400 italic">Ümumi fond: 300,000 AZN</p>
        </motion.div>

        {/* Principles */}
        <motion.div variants={itemVariants} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 md:col-span-2">
          <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center mb-6">
            <ListChecks />
          </div>
          <h2 className="text-xl font-bold text-brand mb-4">Əsas Prinsiplər</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-gray-600 text-sm">
            <p>• Kiçik yaradıcı kollektivlər (maks. 7 nəfər)</p>
            <p>• Təcrübəli və beynəlxalq nüfuzlu rəhbərlər</p>
            <p>• Digər fondlar tərəfindən maliyyələşməyən mövzular</p>
            <p>• Texniki və elmi ekspertiza mərhələləri</p>
            <p>• Hər şəxs üçün yalnız bir layihə</p>
            <p>• Şəffaf və çarpaz elmi qiymətləndirmə</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Application */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-block p-3 bg-blue-100 text-brand rounded-full mb-6">
            <FileSignature size={32} />
          </div>
          <h2 className="text-3xl font-bold text-brand mb-6">Müraciət qaydası və vaxtı</h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Layihə təklifləri <span className="font-bold text-gray-900">30 oktyabr 2025-ci il</span>{" "}
            tarixinədək AzTU-nun rəsmi qrant portalı vasitəsilə qəbul ediləcək.
          </p>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 inline-block">
            <a href={siteConfig.portalUrl} className="text-xl font-semibold text-brand hover:underline">
              e-grant.aztu.edu.az
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-brand mb-6 flex items-center gap-3">
              <HelpCircle size={32} /> Əlaqə
            </h2>
            <p className="text-gray-600 mb-8">
              Əlavə məlumat üçün AzTU Tədqiqat və İnkişaf Departamenti ilə əlaqə saxlaya bilərsiniz.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-brand">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">İş vaxtı</p>
                  <p className="text-gray-700">{siteConfig.contacts.workingHours}</p>
                </div>
              </div>
              <a href={`tel:${siteConfig.contacts.grantPhoneHref}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Telefon</p>
                  <p className="text-gray-700 font-semibold group-hover:text-brand transition-colors">{siteConfig.contacts.grantPhone}</p>
                </div>
              </a>
              <a href={`mailto:${siteConfig.contacts.email}`} className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">E-poçt</p>
                  <p className="text-gray-700 font-semibold group-hover:text-brand transition-colors">{siteConfig.contacts.email}</p>
                </div>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 bg-brand text-white p-10 rounded-3xl relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-white/5 blur-3xl" />
            <h2 className="text-2xl font-bold mb-6">Sualınız var?</h2>
            <p className="text-blue-100 mb-8 leading-relaxed">
              Bütün suallarınızı elektron poçt ünvanımıza göndərə bilərsiniz. Komandamız
              operativ şəkildə cavablandıracaqdır.
            </p>
            <a href={`mailto:${siteConfig.contacts.email}`} className="inline-block bg-white text-brand px-6 py-3 rounded-xl font-bold transition-transform hover:scale-105 shadow-lg">
              Məktub yazın
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
