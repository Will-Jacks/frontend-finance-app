import React from 'react';
import {
    PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

import { CATEGORIAS } from '../../config/config';
import './analytics.css';
import useMQTT from '../../hooks/useMQTT';

const CATEGORY_COLORS = {
    "Alimentação": "#FF8042",
    "Assinaturas": "#0088FE",
    "Contas Fixas": "#FF0000",
    "Cosméticos": "#FFBB28",
    "Gasolina": "#8884d8",
    "Pets": "#00C49F",
    "Roupas": "#FF4560",
    "Outros": "#AAAAAA",
};

const BUYER_COLORS = {
    "Lívia": "#3a7ca5",
    "William": "#d94e64"
};

function Analytics() {
    const { message } = useMQTT();
    const processDataForPieChart = () => {
        if (!message || message.length === 0) return [];

        const categoryTotals = message.reduce((acc, bill) => {
            const category = bill.categoria || "Outros";
            const value = parseFloat(bill.valor) || 0;
            if (!acc[category]) acc[category] = 0;
            acc[category] += value;
            return acc;
        }, {});

        return Object.keys(categoryTotals).map(category => ({
            name: category,
            value: parseFloat(categoryTotals[category].toFixed(2))
        }));
    };
    const pieData = processDataForPieChart();

    const processDataForBarChart = () => {
        if (!message || message.length === 0) return [];

        const buyerTotals = message.reduce((acc, bill) => {
            const buyer = bill.comprador || "N/A";
            const value = parseFloat(bill.valor) || 0;

            if (buyer === "Lívia" || buyer === "William") {
                if (!acc[buyer]) acc[buyer] = 0;
                acc[buyer] += value;
            }
            return acc;
        }, {});

        return Object.keys(buyerTotals).map(buyer => ({
            name: buyer,
            gasto: parseFloat(buyerTotals[buyer].toFixed(2))
        }));
    };
    const barData = processDataForBarChart();

    const noData = pieData.length === 0 && barData.length === 0;

    if (noData) {
        return (
            <div className="analytics-container">
                <h2 className="analytics-title">Análise de Gastos</h2>
                <div className="chart-wrapper" style={{ height: '150px', textAlign: 'center' }}>
                    <p>Não há dados de gastos no período selecionado para exibir os gráficos.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="analytics-container">
            {/* --- Gráfico 1: Pizza --- */}
            <h2 className="analytics-title">Gastos por Categoria</h2>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            labelLine={false}
                            label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={CATEGORY_COLORS[entry.name] || '#AAAAAA'}
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value) => `R$ ${value.toFixed(2)}`}

                            // --- ESTILOS DIRETOS ---
                            // Estilo da "caixa" (wrapper)
                            contentStyle={{
                                backgroundColor: '#181A1B', // Seu fundo
                                borderColor: 'var(--border-color, #2A2A3A)', // Borda do tema
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
                            }}
                            // Estilo do texto do item (Ex: "R$ 150.00")
                            itemStyle={{
                                color: '#FFFFFF' // Sua cor de texto
                            }}
                            // Estilo do "título" (Ex: "Alimentação")
                            labelStyle={{
                                color: '#AAAAAA' // Um cinza para o nome
                            }}
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfico 2: Barras */}
            <h2 className="analytics-title">Gastos por Comprador</h2>
            <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={barData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#555" />

                        <XAxis dataKey="name" stroke="#F0F0F0" />

                        <YAxis stroke="#F0F0F0" />

                        <Tooltip
                            formatter={(value) => `R$ ${value.toFixed(2)}`}
                            cursor={{ fill: 'rgba(255,255,255,0.1)' }}

                            // --- MESMOS ESTILOS DIRETOS ---
                            contentStyle={{
                                backgroundColor: '#181A1B',
                                borderColor: 'var(--border-color, #2A2A3A)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
                            }}
                            itemStyle={{
                                color: '#FFFFFF'
                            }}
                            labelStyle={{
                                color: '#AAAAAA'
                            }}
                        />
                        <Legend />

                        <Bar dataKey="gasto" fill="#8884d8">
                            {barData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={BUYER_COLORS[entry.name] || '#8884d8'}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default Analytics;