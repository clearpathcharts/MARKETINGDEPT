/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layout/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Integrations } from './pages/Integrations';
import { Agents } from './pages/Agents';
import { Registry } from './pages/Registry';
import { Developer } from './pages/Developer';
import { SearchIntelligence } from './pages/SearchIntelligence';
import { Publishing } from './pages/Publishing';
import { PlaceholderPage } from './pages/PlaceholderPage';
import { NAVIGATION_ITEMS } from './lib/constants';

const REAL_PATHS = new Set([
  '/',
  '/integrations',
  '/agents',
  '/registry',
  '/developer',
  '/search-intelligence',
  '/publishing',
]);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/registry" element={<Registry />} />
          <Route path="/developer" element={<Developer />} />
          <Route path="/search-intelligence" element={<SearchIntelligence />} />
          <Route path="/publishing" element={<Publishing />} />
          {NAVIGATION_ITEMS.filter((item) => !REAL_PATHS.has(item.path)).map((item) => (
            <Route key={item.path} path={item.path} element={<PlaceholderPage />} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
