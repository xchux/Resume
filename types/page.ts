import { profile } from 'console';
import exp from 'constants';
import { link } from 'fs';
import { title } from 'process';
import { z } from 'zod';

export const languageSchema = z.object({
  title: z.string(),
});

export const profileSchema = z.object({
  title: z.string(),
  name: z.string(),
  profession: z.string(),
});

export const aboutSchema = z.object({
  title: z.string(),
  motto: z.string(),
  autobiography: z.array(z.string()),
  email: z.string(),
  linkedin: z.string(),
  github: z.string(),
  twitter: z.string(),
});

export const workExperienceCompanySchema = z.object({
  name: z.string(),
  icon: z.string(),
  profile: z.string(),
  position: z.string(),
  duration: z.string(),
  descriptions: z.array(z.string()),
});

export const workExperienceSchema = z.object({
  title: z.string(),
  companies: z.array(workExperienceCompanySchema),
});

export const projectProjectsSchema = z.object({
  name: z.string(),
  profile: z.string(),
  duration: z.string(),
  descriptions: z.array(z.string()),
});

export const projectSchema = z.object({
  title: z.string(),
  projects: z.array(projectProjectsSchema),
});

export const educationSchoolSchema = z.object({
  name: z.string(),
  icon: z.string(),
  duration: z.string(),
  degree: z.string(),
});

export const educationSchema = z.object({
  title: z.string(),
  schools: z.array(educationSchoolSchema),
});

export const skillFrontendSchema = z.object({
  title: z.string(),
});

export const skillBackendSchema = z.object({
  title: z.string(),
});

export const skillDatabSchema = z.object({
  title: z.string(),
});

export const skillDevopsSchema = z.object({
  title: z.string(),
});


export const skillsSchema = z.object({
  title: z.string(),
  frontend: skillFrontendSchema,
  backend: skillBackendSchema,
  data: skillDatabSchema,
  devOps: skillDevopsSchema,
});


export const awardProjectCompetitionSchema = z.object({
  name: z.string(),
  ranking: z.string(),
});

export const awardProjectSchema = z.object({
  name: z.string(),
  competitions: z.array(awardProjectCompetitionSchema),
});

export const awardsSchema = z.object({
  title: z.string(),
  projects: z.array(awardProjectSchema),
});

export const translatoinDataSchema = z.object({
  title: z.string(),
  language: languageSchema,
  profile: profileSchema,
  about: aboutSchema,
  workExperience: workExperienceSchema,
  education: educationSchema,
  project: projectSchema,
  skills: skillsSchema,
  awards: awardsSchema,
});

export const translatoinSchema = z.object({
  data: translatoinDataSchema,
});

export type translatoinSchemaType = z.infer<typeof translatoinSchema>;
export type translatoinDataSchemaType = z.infer<typeof translatoinDataSchema>;
export type languageSchemaType = z.infer<typeof languageSchema>;
export type profileSchemaType = z.infer<typeof profileSchema>;
export type aboutSchemaType = z.infer<typeof aboutSchema>;
export type workExperienceSchemaType = z.infer<typeof workExperienceSchema>;
export type workExperienceCompanySchemaType = z.infer<typeof workExperienceCompanySchema>;
export type projectProjectsSchemaType = z.infer<typeof projectProjectsSchema>;
export type projectSchemaType = z.infer<typeof projectSchema>;
export type educationSchemaType = z.infer<typeof educationSchema>;
export type educationSchoolSchemaType = z.infer<typeof educationSchoolSchema>;
export type skillsSchemaType = z.infer<typeof skillsSchema>;
export type awardsSchemaType = z.infer<typeof awardsSchema>;
export type awardProjectSchemaType = z.infer<typeof awardProjectSchema>;
export type awardProjectCompetitionSchemaType = z.infer<typeof awardProjectCompetitionSchema>;
