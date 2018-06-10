<template>
  <div class="hello">
    <h1>Water quality Graph</h1>
      <div id="chart_div"></div>
  </div>
</template>

<script>
import { db } from "../../js/database/firebase";

export default {
  name: "about",
  data() {
    return {};
  },
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph: function() {
      var storyRef = db.ref("measurements");
      let turbidityArray = [];

      storyRef.on("child_added", function(snapshot) {
        var data = snapshot.val();
        turbidityArray.push({
          turbidity: data.payload_fields.turbidity,
          date:
            data.metadata.time.slice(6, 10).toString() +
            " " +
            data.metadata.time.slice(12, 16).toString()
        });
      });

      var options = {
        vAxis: {
          textPosition: "top"
        },
        curveType: "function",
        series: {
          0: { lineWidth: 5 }
        }
      };

      google.charts.load("current", { packages: ["corechart", "line"] });
      google.charts.setOnLoadCallback(drawBasic);

      function drawBasic() {
        var data = new google.visualization.DataTable();
        data.addColumn("string", "Date");
        data.addColumn("number", "turbidity");
        data.addColumn({ type: "number", role: "annotation" });

        for (let i = 0; i < turbidityArray.length; i++) {
          data.addRows([
            [turbidityArray[i]["date"], turbidityArray[i]["turbidity"],turbidityArray[i]["turbidity"]]
          ]);
        }

        var chart = new google.visualization.LineChart(
          document.getElementById("chart_div")
        );

        chart.draw(data, options);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  margin-top: 10px;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
