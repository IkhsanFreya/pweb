<?php

namespace Database\Factories;

use App\Models\Person;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Person>
 */
class PersonFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'category_id' => function () {
                // Get a random existing category UUID
                return Category::inRandomOrder()->first()?->id;
            },
            'family_id' => null
        ];
    }
}
