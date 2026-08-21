/* ==========================================
   AVENTURA GLOBAL - AMCHARTS 5 MAP LOGIC
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (typeof am5 !== 'undefined') {
    am5.ready(function() {
      var root = am5.Root.new("chartdiv");

      var brandTheme = am5.Theme.new(root);
      brandTheme.rule("InterfaceColors").setAll({
        primaryButton: am5.color(0x003f87),
        primaryButtonHover: am5.color(0x0056b3),
        primaryButtonDown: am5.color(0x002d62),
        primaryButtonActive: am5.color(0x0056b3),
        primaryButtonText: am5.color(0xffffff),
        secondaryButton: am5.color(0xfd8b00),
        secondaryButtonHover: am5.color(0xe07a00),
        secondaryButtonDown: am5.color(0xc56800),
        secondaryButtonText: am5.color(0xffffff),
        background: am5.color(0xf8f9ff),
        text: am5.color(0x0b1c30)
      });

      root.setThemes([am5themes_Animated.new(root), brandTheme]);

      root.container.set("background", am5.Rectangle.new(root, {
        fill: am5.color(0xe5eeff),
        fillPattern: am5.GrainPattern.new(root, {
          density: 0.4,
          maxOpacity: 0.05,
          colors: [am5.color(0x000000)]
        })
      }));

      var adventureBlue = am5.color(0x003f87);
      var enthusiastOrange = am5.color(0xfd8b00);
      var darkNavy = am5.color(0x0b1c30);

      var chart = root.container.children.push(am5map.MapChart.new(root, {
        panX: "rotateX",
        panY: "rotateY",
        projection: am5map.geoOrthographic(),
        rotationX: -60,
        rotationY: -15,
        minZoomLevel: 0.5,
        zoomLevel: 0.9
      }));

      var bgSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
      bgSeries.mapPolygons.template.setAll({
        fill: am5.color(0xe5eeff),
        fillOpacity: 1,
        strokeOpacity: 0
      });
      bgSeries.data.push({ geometry: am5map.getGeoRectangle(90, 180, -90, -180) });

      var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
      graticuleSeries.mapLines.template.setAll({
        stroke: adventureBlue,
        strokeOpacity: 0.12,
        strokeWidth: 0.5
      });

      var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow
      }));
      polygonSeries.mapPolygons.template.setAll({
        fill: am5.color(0xd3e4fe),
        stroke: am5.color(0xc2c6d4),
        strokeWidth: 0.5,
        strokeOpacity: 0.6,
        cursorOverStyle: "pointer"
      });

      const countryToDestMap = {
        "CO": ["isla_mucura", "nevados", "valle_cocora"],
        "BR": ["salvador"],
        "PE": ["machu_picchu"],
        "MX": ["cenote", "cancun"],
        "HR": ["diocleciano"],
        "IT": ["ostia"],
        "TH": ["santuario"],
        "AR": ["iguazu"],
        "CH": ["alpes_suizos"]
      };

      polygonSeries.mapPolygons.template.events.on("click", function(ev) {
        var dataItem = ev.target.dataItem;
        var countryId = dataItem.get("id");
        var countryName = dataItem.get("name") || "Colombia";
        if (countryToDestMap[countryId]) {
          const destIds = countryToDestMap[countryId];
          if (destIds.length === 1) {
            const targetCard = document.querySelector(`.destination-card[data-id="${destIds[0]}"]`);
            if (targetCard) {
              targetCard.click();
            }
          } else if (destIds.length > 1 && window.openCountryModal) {
            window.openCountryModal(countryName, destIds);
          }
        }
      });

      var destinationIds = Object.keys(countryToDestMap);

      polygonSeries.events.on("datavalidated", function () {
        am5.array.each(polygonSeries.dataItems, function (di) {
          var id = di.get("id");
          if (id && destinationIds.includes(id)) {
            di.get("mapPolygon").setAll({ 
              fill: enthusiastOrange, 
              fillOpacity: 0.85,
              tooltipText: "{name} (Haz clic para ver fotos y detalles)"
            });
          }
        });
      });

      var titleCont = chart.children.push(am5.Container.new(root, {
        layout: root.verticalLayout,
        x: am5.p50,
        centerX: am5.p50,
        y: am5.p100,
        centerY: am5.p100,
        position: "absolute",
        paddingBottom: 16
      }));

      titleCont.children.push(am5.Label.new(root, {
        text: "Globo Interactivo – Haz clic en un país destacado",
        fontSize: 16,
        fontWeight: "700",
        fill: darkNavy,
        x: am5.p50,
        centerX: am5.p50
      }));

      var zoomControl = chart.set("zoomControl", am5map.ZoomControl.new(root, {}));
      zoomControl.homeButton.set("visible", true);

      var rotationAnimation = chart.animate({
        key: "rotationX",
        from: -60,
        to: -60 + 360,
        duration: 120000,
        loops: Infinity,
        easing: am5.ease.linear
      });

      chart.chartContainer.events.on("pointerdown", function () {
        if (rotationAnimation) {
          rotationAnimation.stop();
          rotationAnimation = null;
        }
      });

      chart.appear(1000, 100);
    });
  }
});
