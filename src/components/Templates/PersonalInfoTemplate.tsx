import React from 'react';
import { PersonalInfoContent, ThemeConfig, Language } from '../../types/journal';
import { User, Mail, Compass, HeartHandshake, Quote } from 'lucide-react';

interface PersonalInfoTemplateProps {
  content: PersonalInfoContent;
  theme: ThemeConfig;
  lang: Language;
  isEditable?: boolean;
  onChange: (field: string, value: any) => void;
  inkSaverMode?: boolean;
}

export const PersonalInfoTemplate: React.FC<PersonalInfoTemplateProps> = ({
  content,
  theme,
  lang,
  isEditable,
  onChange,
  inkSaverMode,
}) => {
  const isId = lang === 'id';

  return (
    <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b pb-4 mb-6" style={{ borderColor: theme.borderColor }}>
        <div className="flex items-center gap-2 mb-1">
          <User className="w-4 h-4" style={{ color: theme.accentColor }} />
          <span className="text-xs tracking-widest uppercase font-semibold text-stone-500 font-sans-clean">
            {isId ? 'Halaman Pembuka' : 'Opening Page'}
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-serif-display font-bold" style={{ color: theme.primaryColor }}>
          {isId ? 'Informasi Pribadi & Tujuan' : 'Personal Information & Purpose'}
        </h2>
      </div>

      <div className="space-y-6 flex-1">
        {/* Name and Contact Box */}
        <div
          className="p-5 rounded-lg border grid grid-cols-1 sm:grid-cols-2 gap-4"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              {isId ? 'Nama Pemilik' : 'Owner Name'}
            </label>
            {isEditable ? (
              <input
                type="text"
                value={content.ownerName || ''}
                onChange={(e) => onChange('ownerName', e.target.value)}
                placeholder="Nama lengkap..."
                className="w-full font-serif-classic text-lg font-semibold bg-transparent border-b border-stone-200 focus:border-stone-500 focus:outline-none py-1"
                style={{ color: theme.primaryColor }}
              />
            ) : (
              <p className="font-serif-classic text-lg font-semibold" style={{ color: theme.primaryColor }}>
                {content.ownerName}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1">
              {isId ? 'Kontak / Surel' : 'Contact / Email'}
            </label>
            {isEditable ? (
              <input
                type="text"
                value={content.emailPhone || ''}
                onChange={(e) => onChange('emailPhone', e.target.value)}
                placeholder="Surel atau nomor telepon..."
                className="w-full text-sm font-sans-clean bg-transparent border-b border-stone-200 focus:border-stone-500 focus:outline-none py-1.5"
                style={{ color: theme.textColor }}
              />
            ) : (
              <p className="text-sm font-sans-clean" style={{ color: theme.textColor }}>
                {content.emailPhone}
              </p>
            )}
          </div>
        </div>

        {/* Purpose of the Journal */}
        <div
          className="p-5 rounded-lg border"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4" style={{ color: theme.accentColor }} />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-600 font-sans-clean">
              {isId ? 'Tujuan & Niat Menulis Jurnal Ini' : 'Purpose & Intention for this Journal'}
            </h3>
          </div>
          {isEditable ? (
            <textarea
              value={content.purpose || ''}
              onChange={(e) => onChange('purpose', e.target.value)}
              placeholder="Tuliskan niat baik Anda untuk jurnal ini..."
              rows={3}
              className="w-full text-sm leading-relaxed font-serif-reading bg-transparent border border-transparent hover:border-stone-200 focus:border-stone-400 focus:outline-none rounded p-1.5 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-sm leading-relaxed font-serif-reading" style={{ color: theme.textColor }}>
              {content.purpose}
            </p>
          )}
        </div>

        {/* Opening Dedication Note */}
        <div
          className="p-5 rounded-lg border"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <HeartHandshake className="w-4 h-4" style={{ color: theme.accentColor }} />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-600 font-sans-clean">
              {isId ? 'Catatan Pembuka untuk Diri Sendiri' : 'Opening Note to Self'}
            </h3>
          </div>
          {isEditable ? (
            <textarea
              value={content.openingNote || ''}
              onChange={(e) => onChange('openingNote', e.target.value)}
              placeholder="Pesan hangat untuk menyemangati perjalanan Anda..."
              rows={3}
              className="w-full text-sm leading-relaxed font-serif-reading bg-transparent border border-transparent hover:border-stone-200 focus:border-stone-400 focus:outline-none rounded p-1.5 resize-none"
              style={{ color: theme.textColor }}
            />
          ) : (
            <p className="text-sm leading-relaxed font-serif-reading" style={{ color: theme.textColor }}>
              {content.openingNote}
            </p>
          )}
        </div>

        {/* Favorite Quote Box */}
        <div
          className="p-5 rounded-lg border text-center flex flex-col items-center"
          style={{
            borderColor: theme.borderColor,
            backgroundColor: inkSaverMode ? '#FFFFFF' : theme.paperBgColor,
          }}
        >
          <Quote className="w-5 h-5 mb-1 opacity-60" style={{ color: theme.accentColor }} />
          {isEditable ? (
            <textarea
              value={content.favoriteQuote || ''}
              onChange={(e) => onChange('favoriteQuote', e.target.value)}
              placeholder="Kutipan favorit yang menguatkan..."
              rows={2}
              className="w-full text-center text-sm font-serif-reading italic bg-transparent border-b border-transparent hover:border-stone-200 focus:border-stone-400 focus:outline-none p-1 resize-none"
              style={{ color: theme.primaryColor }}
            />
          ) : (
            <p className="text-sm font-serif-reading italic" style={{ color: theme.primaryColor }}>
              {content.favoriteQuote}
            </p>
          )}
        </div>
      </div>

      {/* Footer Return Notice */}
      <div className="pt-4 border-t text-center text-xs text-stone-500 font-sans-clean" style={{ borderColor: theme.borderColor }}>
        {isEditable ? (
          <input
            type="text"
            value={content.contactEmergency || ''}
            onChange={(e) => onChange('contactEmergency', e.target.value)}
            placeholder="Keterangan pengembalian jika tertinggal..."
            className="w-full text-center bg-transparent border-b border-transparent hover:border-stone-200 focus:border-stone-400 focus:outline-none py-1"
          />
        ) : (
          <span>{content.contactEmergency}</span>
        )}
      </div>
    </div>
  );
};
