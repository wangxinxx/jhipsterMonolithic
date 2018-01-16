package com.huibozhixin.jhimonolithic.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.hibernate5.Hibernate5Module;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.format.datetime.standard.DateTimeFormatterRegistrar;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import java.util.List;

@Configuration
public class DateTimeFormatConfiguration extends WebMvcConfigurerAdapter {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        DateTimeFormatterRegistrar registrar = new DateTimeFormatterRegistrar();
        registrar.setUseIsoFormat(true);
        registrar.registerFormatters(registry);
    }
    //-----------by wangxin
    private Hibernate5Module hibernate5Module() {

        return new Hibernate5Module()
            .enable(Hibernate5Module.Feature.USE_TRANSIENT_ANNOTATION)
            .enable(Hibernate5Module.Feature.FORCE_LAZY_LOADING);

    }

    /**
     * 作用在于处理 spring mvc 中 Jackson 处理 json数据时遇到的懒加载，如果可以忽略那就不处理。
     * @return
     */
    public MappingJackson2HttpMessageConverter jacksonMessageConverter() {
        MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter();
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(hibernate5Module());

        // 如果对象为空时，不再出现disable SerializationFeature.FAIL_ON_EMPTY_BEANS的提示
        // mapper.configure(SerializationFeature.FAIL_ON_EMPTY_BEANS, false);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        messageConverter.setObjectMapper(mapper);
        return messageConverter;
    }
    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(jacksonMessageConverter());
        super.configureMessageConverters(converters);
    }
}
