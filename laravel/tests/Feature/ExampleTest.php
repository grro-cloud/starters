<?php

namespace Tests\Feature;

use Tests\TestCase;

class ExampleTest extends TestCase
{
    public function test_healthz_returns_ok(): void
    {
        $this->get('/healthz')->assertOk();
    }

    public function test_home_page_says_it_runs_on_grro(): void
    {
        $this->get('/')->assertOk()->assertSee('Laravel is running on Grro');
    }

    public function test_hello_greets(): void
    {
        $this->get('/api/hello?name=Ada')->assertOk()->assertJson(['message' => 'Hello Ada, from Laravel on Grro.']);
    }
}
