<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'fakir',
                'desc' => 'orang yang tidak memiliki sumber daya ekonomi yang cukup untuk memenuhi kebutuhan dasar mereka, seperti makanan, pakaian, dan tempat tinggal.',
            ],
            [
                'name' => 'miskin',
                'desc' => 'orang yang memiliki sumber daya ekonomi yang terbatas, tetapi masih dapat memenuhi kebutuhan dasar mereka, namun dengan kesulitan.',
            ],
            [
                'name' => 'amilin',
                'desc' => 'orang yang memiliki sumber daya ekonomi yang cukup untuk memenuhi kebutuhan dasar mereka, serta memiliki kemampuan untuk membantu orang lain yang membutuhkan.',
            ],
            [
                'name' => 'mualaf',
                'desc' => 'orang yang baru saja memeluk agama Islam, dan masih memerlukan bantuan dan dukungan untuk memahami dan mengamalkan ajaran-ajaran agama.',
            ],
            [
                'name' => 'ghorim',
                'desc' => 'orang yang memiliki utang yang besar, dan memerlukan bantuan untuk melunasi utang mereka.',
            ],
            [
                'name' => 'fisabillilah',
                'desc' => 'orang yang berjuang di jalan Allah, seperti para mujahidin, dan mereka yang berkorban untuk kepentingan agama dan umat.',
            ],
            [
                'name' => 'ibnusabil',
                'desc' => 'orang yang berperang di jalan Allah, seperti para prajurit yang berjuang melawan musuh-musuh agama, dan mereka yang terluka atau gugur dalam pertempuran.',
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
