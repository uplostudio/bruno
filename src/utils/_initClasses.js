export const layoutClasses = `
div { display: flex; flex-direction: column; position: relative; }
p { margin: 0 }
.fd-h { flex-direction: row }
.f-w { flex-wrap: wrap }
.w-f { width: 100% }
.f-1 { flex: 1 0 0 }
.pos-a { position: absolute }
.pos-a-c { left: 50%; transform: translateX(-50%) }

@media (max-width: 768px) {
    .t_fd-v { flex-direction: column }
    .t_fd-h { flex-direction: row }
}

@media (max-width: 479px) {
    .m_fd-v { flex-direction: column }
    .m_fd-h { flex-direction: row }
}
`;
