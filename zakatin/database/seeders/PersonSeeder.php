<?php

namespace Database\Seeders;

use App\Models\Person;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Collection;

class PersonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $persons = Person::factory(200)->create();

        $this->assignFamilies($persons);
    }

    private function assignFamilies(Collection $persons): void
    {
        // Create a collection to track available persons for assignment
        $availablePersons = $persons->pluck('id')->toArray();

        // Keep track of family heads
        $familyHeads = [];

        // First pass: Decide who's a family head and who lives alone
        foreach ($persons as $person) {
            // Random check to decide if this person is a family head or lives alone
            $isFamilyHeadOrAlone = rand(0, 2) > 0; // 2/3 chance

            if ($isFamilyHeadOrAlone) {
                // This person is a family head or lives alone (family_id remains null)
                $familyHeads[] = $person->id;

                // Remove from available persons pool
                $key = array_search($person->id, $availablePersons);
                if ($key !== false) {
                    unset($availablePersons[$key]);
                }
            }
        }

        // Reset array keys
        $availablePersons = array_values($availablePersons);

        // Second pass: Assign family members to family heads
        foreach ($familyHeads as $headId) {
            // Randomly decide how many family members they'll have (0-6)
            $maxPossible = min(6, count($availablePersons));
            $familyMemberCount = rand(0, $maxPossible);

            if ($familyMemberCount > 0) {
                // Select random available persons to be family members
                $selectedIndices = array_rand($availablePersons, $familyMemberCount);

                // Make sure selectedIndices is always an array
                if (!is_array($selectedIndices)) {
                    $selectedIndices = [$selectedIndices];
                }

                // Get the actual IDs
                $selectedMemberIds = [];
                foreach ($selectedIndices as $index) {
                    $selectedMemberIds[] = $availablePersons[$index];
                }

                // Update family_id for selected members
                Person::whereIn('id', $selectedMemberIds)
                    ->update(['family_id' => $headId]);

                // Remove assigned persons from available pool
                $availablePersons = array_diff($availablePersons, $selectedMemberIds);
            }
        }

        // If there are still available persons, assign them to random family heads
        // that have less than 6 members
        while (!empty($availablePersons)) {
            // Find family heads with less than 6 members
            $eligibleHeads = [];
            foreach ($familyHeads as $headId) {
                $memberCount = Person::where('family_id', $headId)->count();
                if ($memberCount < 6) {
                    $eligibleHeads[] = [
                        'id' => $headId,
                        'space' => 6 - $memberCount
                    ];
                }
            }

            // If no eligible heads, make the remaining persons live alone
            if (empty($eligibleHeads)) {
                break;
            }

            // Assign to random eligible head
            $randomHeadIndex = array_rand($eligibleHeads);
            $randomHead = $eligibleHeads[$randomHeadIndex];

            // Determine how many to assign (up to available space)
            $toAssign = min(count($availablePersons), $randomHead['space']);
            $selectedIndices = array_slice($availablePersons, 0, $toAssign);

            // Update family_id for selected members
            Person::whereIn('id', $selectedIndices)
                ->update(['family_id' => $randomHead['id']]);

            // Remove assigned persons from available pool
            $availablePersons = array_diff($availablePersons, $selectedIndices);
        }
    }
}
