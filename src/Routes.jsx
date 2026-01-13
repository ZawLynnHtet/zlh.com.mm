import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import CodeLaboratoryInteractiveEnvironment from './pages/code-laboratory-interactive-environment';
import SkillsConstellationVisualization from './pages/skills-constellation-visualization';
import ProjectUniverseGallery from './pages/project-universe-gallery';
import ProfessionalStoryJourney from './pages/professional-story-journey';
import InteractiveHomepage from './pages/3d-interactive-homepage';
import InnovationPlaygroundExperiments from './pages/innovation-playground-experiments';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        {/* <Route path="/" element={<InteractiveHomepage />} /> */}
        <Route path="/" element={<Navigate to="/3d-interactive-homepage" replace />} />
        {/* <Route path="/code-laboratory-interactive-environment" element={<CodeLaboratoryInteractiveEnvironment />} /> */}
        <Route path="/skills-constellation-visualization" element={<SkillsConstellationVisualization />} />
        <Route path="/project-universe-gallery" element={<ProjectUniverseGallery />} />
        <Route path="/professional-story-journey" element={<ProfessionalStoryJourney />} />
        <Route path="/3d-interactive-homepage" element={<InteractiveHomepage />} />
        {/* <Route path="/innovation-playground-experiments" element={<InnovationPlaygroundExperiments />} /> */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
