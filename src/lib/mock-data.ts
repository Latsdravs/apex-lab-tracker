// src/lib/mock-data.ts

import { Project } from '@/types'

export const mockProjects: Project[] = [
  {
    id: 'PROJ-001',
    name: 'Yapay Zeka Destekli Görüntü İşleme',
    description:
      'Kanserli hücrelerin tespiti için derin öğrenme modellerinin geliştirilmesi.',
    status: 'Active',
    lead: 'Dr. Elif Yılmaz',
  },
  {
    id: 'PROJ-002',
    name: 'Grafen Batarya Teknolojisi',
    description:
      'Yeni nesil, yüksek kapasiteli ve hızlı şarj olan bataryalar üzerine bir araştırma.',
    status: 'Active',
    lead: 'Prof. Dr. Ahmet Kaya',
  },
  {
    id: 'PROJ-003',
    name: 'Kuantum Hesaplama Simülatörü',
    description:
      'Temel kuantum algoritmalarını simüle eden bir web tabanlı platform.',
    status: 'On Hold',
    lead: 'Doç. Dr. Zeynep Arslan',
  },
  {
    id: 'PROJ-004',
    name: 'Laboratuvar Otomasyon Sistemi',
    description:
      'Tekrarlayan test süreçlerini otomatikleştiren robotik kol yazılımı.',
    status: 'Completed',
    lead: 'Dr. Can Öztürk',
  },
]

export const getProjectById = async (
  id: string
): Promise<Project | undefined> => {
  return Promise.resolve(mockProjects.find((project) => project.id === id))
}
