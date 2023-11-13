const start = () => {


const classId = {
  // "NIN": [5,8]
  "EQ": 5
};
fetch('https://events.green-1-aws.live.skybet.com/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    query: `query MarketQueryRenderer_MarketsQuery(
      $eventFilter: EventFilter
      $marketFilter: MarketFilter
      $outcomeOrderBy: String
      $outcomeOrderByDirection: OrderDirection
    ) {
      events(filter: $eventFilter) {
        name
        startTime
        eventId
        classId
        eventType{
          name
          typeId
        }
        markets(filter: $marketFilter) {
          ...StandardMarket_market
          outcomes @order(by: $outcomeOrderBy, direction: $outcomeOrderByDirection) {
            outcomeId
          }
        }
      }
    }

    fragment Outcome_outcome on Outcome {
      outcomeId
      name
      price {
        decimal
        num
        den
      }
      status {
        suspended
        displayable
      }
    }

    fragment StandardMarket_market on Market {
      marketId
      name
      outcomes @order(by: $outcomeOrderBy, direction: $outcomeOrderByDirection) {
        originalOutcome {
          outcomeId
          status {
            suspended
          }
          price {
            den
            num
            decimal
          }
        }
        ...Outcome_outcome
      }
    }
    `,
    variables: {
      "eventFilter": {
        "HAS": [
          "markets"
        ],
        "isOutright": false,
        "isSpecial": false,
        "status": {
          "displayable": true,
          "resulted": false,
          "live": false,
          "started": false,
          "finished": false
        },
         "classId": classId
      },
      "marketFilter": {
        "status": {
          "displayable": true,
          "resulted": false
        },
        "name": {
          "EQ": "Price Boosts"
        }
      },
      "outcomeOrderBy": null,
      "outcomeOrderByDirection": null
    },
  }),
})
  .then((res) => res.json())
  .then((result) => console.log(JSON.stringify(result.data)));
  setTimeout(start, 10000)
}

start()


