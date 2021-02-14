<?php

namespace Database\Factories;

use App\Models\Campaign;
use Illuminate\Database\Eloquent\Factories\Factory;

class CampaignFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Campaign::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'start_date' => $this->faker->dateTimeBetween('now', '10 days')->format('Y-m-d'),
            'end_date' => $this->faker->dateTimeBetween('15 days', '30 days')->format('Y-m-d'),
            'total_budget' => $this->faker->randomFloat(2, 100, 1000),
            'daily_budget' => $this->faker->randomFloat(2, 5, 20),
        ];
    }
}
