(function () {
  "use strict";

  /* EDITAR: número de WhatsApp para recibir los pedidos del carrito (sin espacios ni signos) */
  var WHATSAPP_NUMBER = "34600000000";

  var priceFormatter = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
  function formatPrice(n) { return priceFormatter.format(n); }

  function parsePrice(el) {
    var raw = el.getAttribute("data-price");
    if (!raw) return null;
    var n = parseFloat(raw.replace(",", "."));
    return isNaN(n) ? null : n;
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------- Menu filters ---------------- */
  var filterButtons = document.querySelectorAll(".filter-btn");
  var productCards = document.querySelectorAll(".product-card");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-selected", "true");
      var filter = btn.getAttribute("data-filter");
      productCards.forEach(function (card) {
        var show = filter === "todas" || card.getAttribute("data-category") === filter;
        card.hidden = !show;
      });
    });
  });

  /* ---------------- Toast ---------------- */
  var toastEl = document.getElementById("toast");
  var toastTimer;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("show"); }, 2200);
  }

  /* ---------------- Cart state ---------------- */
  var CART_KEY = "nossapizza_cart_v1";
  var cartItems = [];
  var cartIdCounter = 0;
  try {
    var saved = localStorage.getItem(CART_KEY);
    if (saved) {
      cartItems = JSON.parse(saved);
      cartItems.forEach(function (i) { if (i.id >= cartIdCounter) cartIdCounter = i.id + 1; });
    }
  } catch (e) { cartItems = []; }

  function persist() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cartItems)); } catch (e) { /* ignore */ }
  }

  function addItem(item) {
    item.id = cartIdCounter++;
    cartItems.push(item);
    persist();
    render();
  }
  function removeItem(id) {
    cartItems = cartItems.filter(function (i) { return i.id !== id; });
    persist();
    render();
  }
  function changeQty(id, delta) {
    var item = cartItems.filter(function (i) { return i.id === id; })[0];
    if (!item) return;
    item.qty = Math.max(1, item.qty + delta);
    persist();
    render();
  }

  function computeTotals() {
    var subtotal = 0, pending = false, count = 0;
    cartItems.forEach(function (i) {
      count += i.qty;
      if (i.unitPrice === null) pending = true;
      else subtotal += i.unitPrice * i.qty;
    });
    return { subtotal: subtotal, pending: pending, count: count };
  }

  function buildWhatsAppLink() {
    var lines = ["Hola, quiero hacer este pedido en Nossa Pizza:", ""];
    if (!cartItems.length) {
      lines.push("(Aún no he añadido productos — quiero más información sobre el menú)");
    } else {
      cartItems.forEach(function (item, idx) {
        var head = (idx + 1) + ". " + item.qty + "x " + item.name;
        if (item.sizeLabel) head += " (" + item.sizeLabel + ")";
        lines.push(head);
        if (item.extras && item.extras.length) {
          lines.push("   Extras: " + item.extras.map(function (e) { return e.name; }).join(", "));
        }
        lines.push("   Precio: " + (item.unitPrice === null ? "pendiente de confirmar" : formatPrice(item.unitPrice * item.qty)));
      });
      var totals = computeTotals();
      lines.push("");
      lines.push("Subtotal: " + (totals.pending ? "pendiente de confirmar" : formatPrice(totals.subtotal)));
    }
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
  }

  /* ---------------- Rendering ---------------- */
  var itemsEl = document.getElementById("cart-items");
  var subtotalEl = document.getElementById("cart-subtotal");
  var totalEl = document.getElementById("cart-total");
  var pendingNoteEl = document.getElementById("cart-pending-note");
  var checkoutBtn = document.getElementById("cart-checkout-btn");
  var badgeEls = [document.getElementById("cart-count-header"), document.getElementById("cart-count-fab")];
  var mobileBar = document.getElementById("mobile-order-bar");
  var mobileCountEl = document.getElementById("mobile-order-count");
  var mobileTotalEl = document.getElementById("mobile-order-total");

  function render() {
    if (!itemsEl) return;

    if (!cartItems.length) {
      itemsEl.innerHTML = '<p class="cart-empty">Tu carrito está vacío. Añade alguna pizza desde el menú.</p>';
    } else {
      itemsEl.innerHTML = cartItems.map(function (item) {
        var metaParts = [];
        if (item.sizeLabel) metaParts.push(item.sizeLabel);
        if (item.extras && item.extras.length) metaParts.push("Extras: " + item.extras.map(function (e) { return e.name; }).join(", "));
        var priceLabel = item.unitPrice === null ? "Pendiente" : formatPrice(item.unitPrice * item.qty);
        return (
          '<div class="cart-item">' +
            '<span class="cart-item-name">' + escapeHtml(item.name) + "</span>" +
            '<span class="cart-item-price">' + priceLabel + "</span>" +
            (metaParts.length ? '<span class="cart-item-meta">' + escapeHtml(metaParts.join(" · ")) + "</span>" : "") +
            '<div class="cart-item-controls">' +
              '<div class="qty-stepper">' +
                '<button type="button" class="qty-btn" data-id="' + item.id + '" data-action="dec" aria-label="Reducir cantidad">−</button>' +
                '<span class="qty-value">' + item.qty + "</span>" +
                '<button type="button" class="qty-btn" data-id="' + item.id + '" data-action="inc" aria-label="Aumentar cantidad">+</button>' +
              "</div>" +
              '<button type="button" class="cart-item-remove" data-id="' + item.id + '">Eliminar</button>' +
            "</div>" +
          "</div>"
        );
      }).join("");
    }

    var totals = computeTotals();
    var totalText = !cartItems.length ? "—" : (totals.pending ? "Pendiente" : formatPrice(totals.subtotal));
    subtotalEl.textContent = totalText;
    totalEl.textContent = totalText;
    pendingNoteEl.hidden = !totals.pending;

    badgeEls.forEach(function (el) {
      if (!el) return;
      el.textContent = totals.count;
      el.hidden = totals.count === 0;
    });

    if (totals.count > 0) {
      mobileBar.hidden = false;
      mobileCountEl.textContent = totals.count + (totals.count === 1 ? " producto" : " productos");
      mobileTotalEl.textContent = totals.pending ? "Precio pendiente" : formatPrice(totals.subtotal);
    } else {
      mobileBar.hidden = true;
    }

    checkoutBtn.href = buildWhatsAppLink();
  }

  if (itemsEl) {
    itemsEl.addEventListener("click", function (e) {
      var btn = e.target.closest("button[data-id]");
      if (!btn) return;
      var id = parseInt(btn.getAttribute("data-id"), 10);
      var action = btn.getAttribute("data-action");
      if (action === "inc") changeQty(id, 1);
      else if (action === "dec") changeQty(id, -1);
      else if (btn.classList.contains("cart-item-remove")) removeItem(id);
    });
  }

  /* ---------------- Drawer open/close ---------------- */
  var drawer = document.getElementById("cart-drawer");
  var overlay = document.getElementById("cart-overlay");

  function openCart() {
    if (!drawer) return;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    overlay.hidden = false;
    requestAnimationFrame(function () { overlay.classList.add("open"); });
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    if (!drawer) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    overlay.classList.remove("open");
    setTimeout(function () { overlay.hidden = true; }, 300);
    document.body.style.overflow = "";
  }

  [document.getElementById("cart-toggle-header"), document.getElementById("cart-toggle-fab"), document.getElementById("mobile-order-btn")]
    .forEach(function (btn) { if (btn) btn.addEventListener("click", openCart); });
  var closeBtn = document.getElementById("cart-drawer-close");
  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (overlay) overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && drawer && drawer.classList.contains("open")) closeCart();
  });

  /* ---------------- Product cards: size / extras / qty / add to cart ---------------- */
  document.querySelectorAll(".product-card-body").forEach(function (card) {
    var sizeInputs = card.querySelectorAll(".size-options input");
    var extraInputs = card.querySelectorAll(".extras-options input");
    var qtyValueEl = card.querySelector(".qty-value");
    var liveEl = card.querySelector(".live-price");
    var addBtn = card.querySelector(".add-to-cart-btn");
    var qty = 1;

    function currentSelection() {
      var checkedSize = card.querySelector(".size-options input:checked");
      var sizePrice = checkedSize ? parsePrice(checkedSize) : null;
      var pending = sizePrice === null;
      var total = sizePrice || 0;
      var extras = [];
      extraInputs.forEach(function (ex) {
        if (ex.checked) {
          var p = parsePrice(ex);
          if (p === null) pending = true; else total += p;
          extras.push({ name: ex.value, price: p });
        }
      });
      return { total: total, pending: pending, extras: extras, size: checkedSize };
    }

    function updateLive() {
      var sel = currentSelection();
      liveEl.textContent = sel.pending ? "Precio pendiente" : formatPrice(sel.total * qty);
    }

    sizeInputs.forEach(function (i) { i.addEventListener("change", updateLive); });
    extraInputs.forEach(function (i) { i.addEventListener("change", updateLive); });

    card.querySelectorAll(".qty-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.getAttribute("data-action") === "increase") qty++;
        else qty = Math.max(1, qty - 1);
        qtyValueEl.textContent = qty;
        updateLive();
      });
    });

    if (addBtn) {
      addBtn.addEventListener("click", function () {
        var sel = currentSelection();
        var productName = card.getAttribute("data-product");
        var sizeLabelEl = sel.size ? sel.size.closest(".size-option").querySelector(".size-option-label") : null;
        addItem({
          name: productName,
          sizeLabel: sizeLabelEl ? sizeLabelEl.textContent.replace(/\s+/g, " ").trim() : null,
          extras: sel.extras,
          qty: qty,
          unitPrice: sel.pending ? null : sel.total
        });
        addBtn.classList.add("is-added");
        var originalText = addBtn.textContent;
        addBtn.textContent = "Añadido ✓";
        if (!drawer || !drawer.classList.contains("open")) {
          showToast(productName + " añadido al carrito");
        }
        setTimeout(function () {
          addBtn.classList.remove("is-added");
          addBtn.textContent = originalText;
        }, 1400);
        qty = 1;
        qtyValueEl.textContent = "1";
        updateLive();
      });
    }

    updateLive();
  });

  render();
})();
