const Charts = {
    drawDonutChart(canvas, segments, options = {}) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        ctx.clearRect(0, 0, width, height);

        const total = segments.reduce((s, x) => s + x.value, 0);
        if (!total || total <= 0) {
            ctx.fillStyle = '#8a919c';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Keine Verteilung', width / 2, height / 2);
            return;
        }

        const cx = width / 2;
        const cy = height / 2;
        const outer = Math.min(width, height) / 2 * (options.size || 0.92);
        const inner = outer * (options.hole || 0.66);

        let angle = -Math.PI / 2;
        for (const seg of segments) {
            if (!seg.value || seg.value <= 0) continue;
            const frac = seg.value / total;
            const end = angle + frac * Math.PI * 2;

            ctx.beginPath();
            ctx.arc(cx, cy, outer, angle, end);
            ctx.arc(cx, cy, inner, end, angle, true);
            ctx.closePath();
            ctx.fillStyle = seg.color;
            ctx.fill();

            ctx.globalAlpha = 0.35;
            ctx.beginPath();
            ctx.arc(cx, cy, outer, angle - 0.02, end + 0.02);
            ctx.arc(cx, cy, inner, end + 0.02, angle - 0.02, true);
            ctx.closePath();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.globalAlpha = 1;

            angle = end;
        }

        ctx.fillStyle = options.centerColor || '#1b2530';
        ctx.font = '700 ' + Math.round(outer * 0.42) + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((options.centerText || '').substring(0, 10), cx, cy - outer * 0.12);
        if (options.centerSub) {
            ctx.fillStyle = '#8a919c';
            ctx.font = Math.round(outer * 0.18) + 'px sans-serif';
            ctx.fillText(options.centerSub, cx, cy + outer * 0.26);
        }
    },

    drawLineChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const padding = { top: 10, right: 10, bottom: 25, left: 55 };

        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        ctx.clearRect(0, 0, width, height);

        if (!data || data.length < 2) {
            ctx.fillStyle = '#8a919c';
            ctx.font = '14px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Keine Daten verfügbar', width / 2, height / 2);
            return;
        }

        const min = options.min !== undefined ? options.min : Math.min(...data) * 0.995;
        const max = options.max !== undefined ? options.max : Math.max(...data) * 1.005;
        const range = max - min || 1;

        const getX = (i) => padding.left + (i / (data.length - 1)) * chartW;
        const getY = (val) => padding.top + chartH - ((val - min) / range) * chartH;

        // Grid lines
        ctx.strokeStyle = '#e3e7ee';
        ctx.lineWidth = 1;
        const gridLines = 5;
        for (let i = 0; i <= gridLines; i++) {
            const y = padding.top + (i / gridLines) * chartH;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();

            const val = max - (i / gridLines) * range;
            ctx.fillStyle = '#8a919c';
            ctx.font = '10px sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(this.formatPrice(val), padding.left - 6, y + 3);
        }

        // Gradient fill
        const isPositive = data[data.length - 1] >= data[0];
        const lineColor = options.color || (isPositive ? '#1a9d4a' : '#dc2626');
        const fillColor = isPositive ? 'rgba(63,185,80,0.1)' : 'rgba(248,81,73,0.1)';

        const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
        gradient.addColorStop(0, fillColor);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.moveTo(getX(0), getY(data[0]));
        for (let i = 1; i < data.length; i++) {
            const x = getX(i);
            const y = getY(data[i]);
            const px = getX(i - 1);
            const py = getY(data[i - 1]);
            const cpx = (px + x) / 2;
            ctx.bezierCurveTo(cpx, py, cpx, y, x, y);
        }
        ctx.lineTo(getX(data.length - 1), height - padding.bottom);
        ctx.lineTo(getX(0), height - padding.bottom);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // Line
        ctx.beginPath();
        ctx.moveTo(getX(0), getY(data[0]));
        for (let i = 1; i < data.length; i++) {
            const x = getX(i);
            const y = getY(data[i]);
            const px = getX(i - 1);
            const py = getY(data[i - 1]);
            const cpx = (px + x) / 2;
            ctx.bezierCurveTo(cpx, py, cpx, y, x, y);
        }
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        ctx.stroke();

        // End dot
        const lastX = getX(data.length - 1);
        const lastY = getY(data[data.length - 1]);
        ctx.beginPath();
        ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
        ctx.fillStyle = lineColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(lastX, lastY, 7, 0, Math.PI * 2);
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
    },

    drawMiniChart(canvas, data, options = {}) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const padding = 2;

        const chartW = width - padding * 2;
        const chartH = height - padding * 2;

        if (!data || data.length < 2) return;

        const min = Math.min(...data);
        const max = Math.max(...data);
        const range = max - min || 1;

        const isPositive = data[data.length - 1] >= data[0];
        const color = options.color || (isPositive ? '#1a9d4a' : '#dc2626');

        ctx.clearRect(0, 0, width, height);

        ctx.beginPath();
        for (let i = 0; i < data.length; i++) {
            const x = padding + (i / (data.length - 1)) * chartW;
            const y = padding + chartH - ((data[i] - min) / range) * chartH;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    },

    drawBarChart(canvas, data, labels, options = {}) {
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const padding = { top: 10, right: 10, bottom: 30, left: 55 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        ctx.clearRect(0, 0, width, height);

        if (!data || data.length === 0) return;

        const max = Math.max(...data.map(d => Math.abs(d)), 1);
        const barWidth = Math.min(chartW / data.length * 0.6, 40);
        const gap = chartW / data.length;

        for (let i = 0; i < data.length; i++) {
            const x = padding.left + i * gap + (gap - barWidth) / 2;
            const barH = (Math.abs(data[i]) / max) * chartH;
            const y = data[i] >= 0
                ? padding.top + chartH - barH
                : padding.top + chartH;

            ctx.fillStyle = data[i] >= 0 ? '#1a9d4a' : '#dc2626';
            ctx.beginPath();
            ctx.roundRect(x, y, barWidth, barH, 3);
            ctx.fill();

            if (labels && labels[i]) {
                ctx.fillStyle = '#8a919c';
                ctx.font = '9px sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(labels[i], padding.left + i * gap + gap / 2, height - 8);
            }
        }
    },

    formatPrice(price) {
        if (price >= 1000000) {
            return (price / 1000000).toFixed(1) + 'M';
        } else if (price >= 10000) {
            return (price / 1000).toFixed(1) + 'k';
        } else if (price >= 100) {
            return price.toFixed(0);
        } else if (price >= 1) {
            return price.toFixed(2);
        } else {
            return price.toFixed(4);
        }
    }
};
