package com.SquadStation.api_gateway;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, properties = {
        "eureka.client.enabled=false" // Disable Eureka so it doesn't look for real instances
})
class GatewayRouteIntegrationTest {
    @Autowired
    private WebTestClient webTestClient;
    @Test
    void marketplaceRoute_ShouldMatchAndAttemptToLoadBalance(){
        // Expecting 503 (Service Unavailable) proves the Gateway recognized the route
        // and tried to forward it to 'lb://marketplace-service'
        webTestClient.get().uri("/api/marketplace/items")
                .exchange()
                .expectStatus().isEqualTo(503);
    }
    @Test
    void chatRoute_ShouldMatchAndAttemptToLoadBalance(){
        webTestClient.get().uri("/api/chat/history")
                .exchange()
                .expectStatus().isEqualTo(503);
    }
    @Test
    void tripRoute_ShouldMatchAndAttemptToLoadBalance(){
        webTestClient.get().uri("/api/trips/1")
                .exchange()
                .expectStatus().isEqualTo(503);
    }
    @Test
    void unknownRoute_ShouldReturnNotFound(){
        // A path that isn't defined in your application.yaml should return 404 Not Found
        webTestClient.get().uri("/api/unknown-service/endpoint")
                .exchange()
                .expectStatus().isNotFound();
    }

}
