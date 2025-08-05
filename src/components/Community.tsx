import React, { useState } from 'react';
import { MapPin, Star } from 'lucide-react';
import { RegionalUser } from '../types';

interface CommunityProps {
  regionalUsers: RegionalUser[];
}

export const Community: React.FC<CommunityProps> = ({ regionalUsers }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('all');

  const latinAmericanCountries = [
    'México',
    'Colombia',
    'Argentina',
    'Chile',
    'Perú',
    'Brasil',
    'Venezuela',
    'Ecuador',
    'Uruguay',
    'Paraguay',
    'Bolivia',
    'Costa Rica',
    'Panamá',
    'Guatemala',
    'Honduras',
    'El Salvador',
    'Nicaragua',
    'Cuba',
    'República Dominicana',
    'Puerto Rico'
  ];
  const countries = ['all', ...latinAmericanCountries];
  
  const filteredUsers = (selectedCountry === 'all' 
    ? regionalUsers 
    : regionalUsers.filter(user => user.country === selectedCountry)
  ).slice().sort((a, b) => b.level - a.level);

  const getCountryFlag = (country: string) => {
    const countryCodes: { [key: string]: string } = {
      'México': 'mx',
      'Colombia': 'co',
      'Argentina': 'ar',
      'Chile': 'cl',
      'Perú': 'pe',
      'Brasil': 'br',
      'Venezuela': 've',
      'Ecuador': 'ec',
      'Uruguay': 'uy',
      'Paraguay': 'py',
      'Bolivia': 'bo',
      'Costa Rica': 'cr',
      'Panamá': 'pa',
      'Guatemala': 'gt',
      'Honduras': 'hn',
      'El Salvador': 'sv',
      'Nicaragua': 'ni',
      'Cuba': 'cu',
      'República Dominicana': 'do',
      'Puerto Rico': 'pr'
    };
    const code = countryCodes[country];
    if (!code) return null;
    return (
      <img
        src={`https://flagcdn.com/w40/${code}.png`}
        alt={`${country} flag`}
        className="inline-block w-6 h-4 rounded-sm"
      />
    );
  };

  const countryAbbreviations: { [key: string]: string } = {
    'México': 'MX',
    'Colombia': 'CO',
    'Argentina': 'AR',
    'Chile': 'CL',
    'Perú': 'PE',
    'Brasil': 'BR',
    'Venezuela': 'VE',
    'Ecuador': 'EC'
  };

  return (
    <div className="max-w-6xl mx-auto p-6 pb-24">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Comunidad Crypto LATAM</h2>
        <p className="text-white">Conecta con otros entusiastas crypto de tu región</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de usuarios */}
        <div className="lg:col-span-2">
          <div className="glass-card glass-card-hover rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Usuarios Top</h3>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-white bg-gray-700"
            >
              <option value="all">Todos los países</option>
              {countries.slice(1).map((country) => (
                <option key={country} value={country}>
                  {getCountryFlag(country)} {country}
                </option>
              ))}
            </select>
          </div>

            <div className="space-y-4">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-6 glass-card glass-card-hover rounded-2xl"
                >
                  <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.username[0].toUpperCase()}
                        </div>
                        {/* Removed active status circle */}
                      </div>
                    
                    <div>
                      <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-white">{user.username}</h4>
                        <span className="text-lg">{getCountryFlag(user.country)}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm text-white">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span>Nivel {user.level}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{user.country}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {user.expertise.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Chat button removed */}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-6">
          {/* Estadísticas */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 hidden md:block">
                <h3 className="text-xl font-bold text-white mb-4">Estadísticas Regionales</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white">Usuarios Activos</span>
                <span className="font-bold text-green-600">{regionalUsers.filter(u => u.isOnline).length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Total Comunidad</span>
                <span className="font-bold text-purple-600">{regionalUsers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white">Países</span>
                <span className="font-bold text-blue-600">{countries.length - 1}</span>
              </div>
            </div>
          </div>

          {/* Ranking por países */}
          <div className="glass-card glass-card-hover rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Top Países</h3>
<div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-transparent scrollbar-track-transparent pr-4">
              {countries.slice(1).map((country) => {
                const countryUsers = regionalUsers.filter(u => u.country === country);
                const avgLevel = countryUsers.reduce((acc, u) => acc + u.level, 0) / countryUsers.length;
                
                return (
                  <div key={country} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{getCountryFlag(country)}</span>
                      <span className="font-medium text-white">{country}</span>
                      <span className="ml-2 text-white font-semibold">{countryAbbreviations[country]}</span>
                    </div>
<div className="text-right">
  <div className="font-bold text-white">{countryUsers.length} users</div>
  <div className="text-xs text-gray-500">Avg Nivel {avgLevel.toFixed(1)}</div>
</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chat functionality removed */}
        </div>
      </div>
    </div>
  );
};